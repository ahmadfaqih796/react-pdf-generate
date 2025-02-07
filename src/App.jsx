import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("doc");
    console.log(file.size === 0 ? null : file);
  }, []);
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input type="file" name="doc" />
        <button type="submit">Submit</button>
        <button type="reset">Reset</button>
      </form>
    </main>
  );
}

export default App;
