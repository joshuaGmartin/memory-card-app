import * as Helper from "./helper.js";

export default async function getArtData(artData, numArtNeeded, searchQueries) {
  let selectedArt = [...artData]; // make copy
  // API allows 10 pages at 100 artworks each
  let pageChoices = Helper.randomOrder(10, 1);
  let currPageIndex = 0;

  // grab pages until fill quota
  while (selectedArt.length < numArtNeeded) {
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

    selectedArt = getArtFromDataPage(artPageData, selectedArt, numArtNeeded);

    selectedArt = await checkURLs(selectedArt);
  }

  return selectedArt;
}

function getArtFromDataPage(artPageData, selectedArt, numArtNeeded) {
  const randChoices = Helper.randomOrder(artPageData.length, 0);
  let currChoiceIndex = 0;

  while (selectedArt.length < numArtNeeded) {
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
    currArt.clicked = false;
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

// some API calls respond 403 with width as 843 or "full", and need handle 404
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
            width -= 50;
          }
          // if bad call, skip
          else if (res.status === 404) {
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
