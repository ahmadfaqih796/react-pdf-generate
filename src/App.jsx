import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("doc");
    console.log(file.size === 0 ? null : file);
    try {
      const response = await axios
        .create({
          baseURL: "https://v2.convertapi.com",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .post(
          "/convert/doc/to/pdf",
          {
            File: file,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: import.meta.env.VITE_API_KEY,
            },
            params: {
              secret: import.meta.env.VITE_API_KEY,
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
