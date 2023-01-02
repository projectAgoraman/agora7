import "./styles.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import { Game } from "./Game";
import Metaverse from "./Metaverse";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Game" element={<Game />} />
      <Route path="/Metaverse" element={<Metaverse />} />
    </Routes>
  );
}
