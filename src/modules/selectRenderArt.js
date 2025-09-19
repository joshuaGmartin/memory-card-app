import * as Helper from "./helper.js";

export default function selectRenderArt(artData, imgsOnScreen) {
  // separate unclicked and run check
  const unclickedArt = handleUnclicked(artData);
  // add one ensured unclicked to selectedArt and seperate from artData
  let { selectedArt, nonTouchedArt } = seperateOneUnclickedArt(
    artData,
    unclickedArt
  );
  // fill rest of selectedArt with random nonTouchedArt (more than 3 choices at higher levels)
  selectedArt = getRestOfSelectedArt(imgsOnScreen, selectedArt, nonTouchedArt);
  // shuffle, else first pic is always unclicked
  const selectedArt_shuffled = shufflePicks(selectedArt);

  return selectedArt_shuffled;
}

function shufflePicks(selectedArt) {
  let selectedArt_shuffled = [];
  let randChoices = Helper.randomOrder(selectedArt.length, 0);
  randChoices.forEach((choice) =>
    selectedArt_shuffled.push(selectedArt[choice])
  );

  return selectedArt_shuffled;
}

function getRestOfSelectedArt(imgsOnScreen, selectedArt, nonTouchedArt) {
  let randChoices = Helper.randomOrder(nonTouchedArt.length, 0);
  randChoices = randChoices.slice(0, imgsOnScreen - 1);
  randChoices.forEach((choice) => selectedArt.push(nonTouchedArt[choice]));

  return selectedArt;
}

function seperateOneUnclickedArt(artData, unclickedArt) {
  let selectedArt = [];

  // select one random unclicked
  let randIndex = Math.floor(Math.random() * unclickedArt.length);
  selectedArt.push(unclickedArt[randIndex]);

  //remove the guaranteed unclicked from artData
  let nonTouchedArt = [];
  artData.forEach((art) => {
    if (art.image_id !== unclickedArt[randIndex].image_id)
      nonTouchedArt.push(art);
  });

  return { selectedArt, nonTouchedArt };
}

function handleUnclicked(artData) {
  const unclickedArt = artData.filter((art) => !art.clicked);

  // handle error====================================================================
  // could be an issue on last click of 4 imgs? because none are unclicked?
  // need fire getArtData before this
  if (artData.length !== 0 && unclickedArt.length === 0) {
    alert("you win");
    throw new Error("no unclicked art");
  }
  // =================================================================================

  return unclickedArt;
}
