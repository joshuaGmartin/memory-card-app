import { useState, useEffect } from "react";
import getArtData from "../modules/getArtData.js";
import selectRenderArt from "../modules/selectRenderArt.js";

export default function GetArt({ artData, setArtData }) {
  // main variables
  const [numDesiredImgs, setNumDesiredImgs] = useState(4);
  const searchQueries = ["paintings", "drawings"];

  useEffect(() => {
    getArtData(artData, setArtData, numDesiredImgs, searchQueries);
  }, [numDesiredImgs]);

  //this will need to be in state also, changes on clicked in artData
  let selectedArt = selectRenderArt(artData, numDesiredImgs);

  //test=======================================================
  useEffect(() => {
    const btn = document.getElementById("test-btn");

    const handleClick = () => {
      setNumDesiredImgs((prev) => prev + 4);
    };

    btn.addEventListener("click", handleClick);

    return () => {
      btn.removeEventListener("click", handleClick);
    };
  }, [numDesiredImgs]);
  //===========================================================

  return (
    <>
      {selectedArt.map((data) => {
        return (
          <div className="art-card" key={data.image_id}>
            <img
              key={data.image_id}
              src={data.url}
              alt=""
              // onClick={() => console.table(artData)} // temp; for testing
              onClick={() => console.table(artData)} // temp; for testing
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
