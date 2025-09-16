import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [artData, setImage_url] = useState([]);
  useEffect(() => {
    getArt(setImage_url);
  }, []);

  return (
    <>
      {artData.map((data) => {
        return (
          <div className="art-card">
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
      })}
    </>
  );
}

async function getArt(setImage_url) {
  const numDesiredImgs = 4;
  let selectedArt = [];

  while (selectedArt.length < numDesiredImgs) {
    let artPageData = await getArtPageData();
    // bug fix: if no art has image_id, gets stuck in loop or pulls art with no img
    artPageData = artPageData.filter((data) => data.image_id !== null);

    // can get stuck in loop if there are not numDesiredImgs number of true image_id on the data page
    const maxTries = 50;
    let currTry = 1;
    while (selectedArt.length < numDesiredImgs && currTry <= maxTries) {
      if (artPageData.length === 0) break; // bug fix: randomArtData() tries to pull form empty array

      const randomArtData =
        artPageData[Math.floor(Math.random() * artPageData.length)];
      if (checkForUniqueArt(selectedArt, randomArtData))
        selectedArt.push(randomArtData);
      currTry++;
    }
  }

  // add urls
  // for (const art of selectedArt) {
  //   const artData = await fetch(
  //     `https://www.artic.edu/iiif/2/${art.image_id}/info.json`
  //   );

  //   const artDataJSON = await artData.json();
  //   art.maxImgWidth = artDataJSON.sizes[artDataJSON.sizes.length - 1].width;
  //   art.url = `https://www.artic.edu/iiif/2/${art.image_id}/full/${art.maxImgWidth},/0/default.jpg`;
  // }

  await Promise.all(
    selectedArt.map(async (art) => {
      // const res = await fetch(
      //   `https://www.artic.edu/iiif/2/${art.image_id}/info.json`
      // );
      // const json = await res.json();
      // art.maxImgWidth = json.sizes[json.sizes.length - 1].width;
      // art.url = `https://www.artic.edu/iiif/2/${art.image_id}/full/${art.maxImgWidth},/0/default.jpg`;

      art.maxImgWidth = "843";
      art.url = `https://www.artic.edu/iiif/2/${art.image_id}/full/${art.maxImgWidth},/0/default.jpg`;
    })
  );
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

  setImage_url(selectedArt);
}

function checkForUniqueArt(selectedArt, randomArtData) {
  let isUnique = true;

  selectedArt.forEach((art) => {
    if (art.image_id === randomArtData.image_id) {
      isUnique = false;
    }
  });

  return isUnique;
}

async function getArtPageData() {
  //set API call params
  const fieldsDesired = ["image_id", "artist_title", "title", "date_end"];

  const searchQueries = ["paintings", "drawings"];

  const fieldsDesiredString = fieldsDesired.join(",");
  const searchQueriesString = searchQueries.join(" ");
  // API only allows 10 pages of limit=100 max
  let randPage = Math.ceil(Math.random() * 10);

  const pageData = await fetch(
    `https://api.artic.edu/api/v1/artworks/search?q=${searchQueriesString}&fields=${fieldsDesiredString}&page=${randPage}&limit=100`
  );

  const pageDataJSON = await pageData.json();
  return pageDataJSON.data;
}

//remove:       "artwork_type_title": "Archives (groupings)",
// need handle 403
