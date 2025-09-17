import { useState } from "react";
import "./App.css";
import GetArt from "./components/GetArt.jsx";

export default function App() {
  const [artData, setArtData] = useState([]);

  return (
    <>
      <GetArt artData={artData} setArtData={setArtData} />
    </>
  );
}
