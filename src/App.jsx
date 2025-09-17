import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [artData, setArtData] = useState([]);
  useEffect(() => {
    getArt(artData, setArtData);
  }, []);

  return (
    <>
      {artData.map((data, index) => {
        // number imgs to show, need random
        if (index < 4) {
          return (
            <div className="art-card" key={data.image_id}>
              <img
                key={data.image_id}
                src={data.url}
                alt=""
                onClick={() => console.table(data)}
              />
              <div className="art-card-info">
                <b>
                  {data.title}, {data.date_end}
                </b>{" "}
                <br></br>
                <i>{data.artist_title}</i>
              </div>
            </div>
          );
        }
      })}
    </>
  );
}

async function getArt(artData, setArtData) {
  // main variables
  const numDesiredImgs = 4;
  const searchQueries = ["paintings", "drawings"];

  //test
  let skip = false;

  let selectedArt = [...artData]; // make copy
  // let pageChoices = [];
  // API allows 10 pages at 100 artworks each
  let pageChoices = randomOrder(10, 1);
  let currPageIndex = 0;

  // grab pages until fill quota
  while (selectedArt.length < numDesiredImgs) {
    // Handle error
    if (currPageIndex > pageChoices.length - 1) {
      throw new Error("Not enough artworks available");
    }

    // grab current page choice and update counter
    let artPageData = await getArtPageData(
      pageChoices[currPageIndex],
      searchQueries
    );
    currPageIndex++;

    selectedArt = getArtFromDataPage(artPageData, selectedArt, numDesiredImgs);

    if (!skip) {
      // 404
      // selectedArt.pop();
      // selectedArt.push({
      //   image_id: "a45e5f55-d02b-ce98-8bab-3af549684f58",
      // });

      //403
      // selectedArt.pop();
      // selectedArt.push({
      //   image_id: "0356e981-edc5-56ad-1a64-9ebdae3c5aab",
      // });

      skip = true;
    }

    selectedArt = await checkURLs(selectedArt);
  }

  //test long image
  //wide
  // selectedArt.pop();
  // selectedArt.push({
  //   url: "https://www.artic.edu/iiif/2/95c09a2d-2c02-deb8-0e5b-0f7ef13faa5e/full/843,/0/default.jpg",
  // });
  // selectedArt.pop();
  // selectedArt.push({
  //   url: "https://www.artic.edu/iiif/2/8b12267b-6fde-3424-281a-0cb74bb7e36a/full/843,/0/default.jpg",
  // });
  //tall
  // selectedArt.pop();
  // selectedArt.push({
  //   url: "https://www.artic.edu/iiif/2/2479fd9c-a90e-2f5a-b418-6ed505ab2bb9/full/400,/0/default.jpg",
  // });
  // selectedArt.pop();
  // selectedArt.push({
  //   url: "https://www.artic.edu/iiif/2/e6dd6199-c245-d1b4-a997-ce89eafb48ca/full/843,/0/default.jpg",
  // });
  setArtData(selectedArt);
}

function getArtFromDataPage(artPageData, selectedArt, numDesiredImgs) {
  const randChoices = randomOrder(artPageData.length, 0);
  let currChoiceIndex = 0;

  while (selectedArt.length < numDesiredImgs) {
    // Handle Error
    if (currChoiceIndex > randChoices.length - 1) {
      return selectedArt; // if reach end, rerun with new page
    }

    const currArt = artPageData[randChoices[currChoiceIndex]];
    currChoiceIndex++;

    // run checks
    if (currArt.image_id === null) continue;
    if (currArt.artwork_type_title === "Archives (groupings)") continue;
    if (!checkForUniqueArt(selectedArt, currArt)) continue;

    // if good, add it
    currArt.checkURLs = false;
    selectedArt.push(currArt);
  }

  return selectedArt;
}

function checkForUniqueArt(selectedArt, currArt) {
  let isUnique = true;

  selectedArt.forEach((art) => {
    if (art.image_id === currArt.image_id) {
      isUnique = false;
    }
  });

  return isUnique;
}

async function getArtPageData(randPage, searchQueries) {
  //set API call params
  const fieldsDesired = [
    "image_id",
    "artist_title",
    "title",
    "date_end",
    "artwork_type_title",
  ];

  const fieldsDesiredString = fieldsDesired.join(",");
  const searchQueriesString = searchQueries.join(" ");

  const pageData = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchQueriesString}&fields=${fieldsDesiredString}&page=${randPage}&limit=100`
  );

  const pageDataJSON = await pageData.json();
  return pageDataJSON.data;
}

// some API calls respond 403 with width as 843 or "full", and need handle 403
async function checkURLs(selectedArt) {
  let checkedArt = [];

  await Promise.all(
    selectedArt.map(async (currArt) => {
      if (!currArt.checkURLs) {
        let width = 843;
        while (width > 0) {
          const url = `https://www.artic.edu/iiif/2/${currArt.image_id}/full/${width},/0/default.jpg`;
          const res = await fetch(url);

          // if good, note it and add
          if (res.ok) {
            currArt.checkURLs = true;
            checkedArt.push({ ...currArt, url });
            break;
          }
          // if bad size,
          else if (res.status === 403) {
            console.log(width);
            width -= 40;
          }
          // if bad call, skip
          else if (res.status === 404) {
            console.log("bad 404");
            break;
          } else break;
        }
      }
      // if already checked, pass through
      else {
        checkedArt.push(currArt);
      }
    })
  );

  return checkedArt;
}

function randomOrder(n, start) {
  const arr = Array.from({ length: n }, (_, i) => i + start);

  // Fisher–Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }

  return arr;
}
