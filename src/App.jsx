import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/form.style.css";
import "./styles/main.style.css";
import ConvertService from "./services/ConvertService";
import { decodeBase64 } from "./utils/convertBase64";
import GeneratePdfV1 from "./pages/GeneratePdfV1";
import GeneratePdfV2 from "./pages/GeneratePdfV2";

function App() {
  return (
    <>
      {/* <GeneratePdfV1 /> */}
      <GeneratePdfV2 />
    </>
  );
}

export default App;
