import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import ConvertService from "./services/ConvertService";

function App() {
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("doc");

    console.log(file.size === 0 ? null : file);

    try {
      const response = await ConvertService.post(
        {
          file: file,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("masuk", response);
    } catch (error) {
      console.log("ggaagaga", error);
    }
  }, []);

  return (
    <main>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="doc" />
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </main>
  );
}

export default App;
