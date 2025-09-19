import * as Helper from "./helper.js";

export default function selectRenderArt(artData, numDesiredImgs) {
  let selectedArt = [];

  // ensure at least one unclicked
  const unClickedArt = artData.filter((art) => !art.clicked);
  // console.log(unClickedArt);

  // handle error====================================================================
  // could be an issue on last click of 4 imgs? because none are unclicked?
  // need fire getArtData before this
  if (artData.length !== 0 && unClickedArt.length === 0) {
    alert("you win");
    throw new Error("no unclicked art");
  }
  // =================================================================================

  // select one random unclicked
  let randIndex = Math.floor(Math.random() * unClickedArt.length);
  selectedArt.push(unClickedArt[randIndex]);

  //remove the guaranteed unclicked from artData
  let nonTouchedArt = [];
  artData.forEach((art) => {
    if (art.image_id !== unClickedArt[randIndex].image_id)
      nonTouchedArt.push(art);
  });

  // fill rest of selectedArt with random nonTouchedArt (more than 3 choices at higher levels)
  let randChoices = Helper.randomOrder(nonTouchedArt.length, 0);
  randChoices = randChoices.slice(0, 3); // hard code 4 images on screen
  randChoices.forEach((choice) => selectedArt.push(nonTouchedArt[choice]));
  console.log(artData);
  console.log(selectedArt);

  // shuffle, else first pic is always unclicked
  let selectedArt_shuffled = [];
  randChoices = Helper.randomOrder(selectedArt.length, 0);
  randChoices.forEach((choice) =>
    selectedArt_shuffled.push(selectedArt[choice])
  );

  // return artData;
  return selectedArt_shuffled;
}
