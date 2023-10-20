import "./App.css";
import "firebase/compat/auth";
import "firebase/compat/database";
import { Route, Routes } from "react-router-dom";
import Detail from "./view/Detail/Detail";
import ShortLink from "./view/ShortLink/shorLink";

function App() {
  return (
    <Routes>
      <Route path="/detail/:parameter" element={<Detail />} />
      <Route path="/" element={<ShortLink />} />
    </Routes>
  );
}

export default App;
