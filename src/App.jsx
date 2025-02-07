import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/form.style.css";
import "./styles/main.style.css";
import ConvertService from "./services/ConvertService";
import { decodeBase64 } from "./utils/convertBase64";
import GeneratePdfV1 from "./pages/GeneratePdfV1";

function App() {
  return (
    <>
      <GeneratePdfV1 />
    </>
  );
}

export default App;
