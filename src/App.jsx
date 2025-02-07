import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ConvertService from "./services/ConvertService";

function App() {
  const [convert, setConvert] = useState(null);

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
      const convertFile = response.data.Files[0];
      setConvert(convertFile);
    } catch (error) {
      console.log("ggaagaga", error);
    }
  }, []);

  const handleReset = () => {
    setConvert(null);
  };
  console.log("ccccccc", convert);

  const handleShow = React.useCallback(
    (e) => {
      e.preventDefault();
      if (convert && convert.FileData) {
        const binaryData = atob(convert.FileData);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    },
    [convert]
  );

  const handleDownload = React.useCallback(
    (e) => {
      e.preventDefault();
      if (convert && convert.FileData) {
        // Decode base64 to binary
        const binaryData = atob(convert.FileData);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = convert.FileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    },
    [convert]
  );

  return (
    <main>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="doc" />
        <button type="submit">Submit</button>
        <button type="reset" onClick={handleReset}>
          Reset
        </button>
      </form>
      <div>
        <button onClick={handleShow}>View</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      {/* <div>{convert}</div> */}
    </main>
  );
}

export default App;
