import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ConvertService from "./services/ConvertService";
import { decodeBase64 } from "./utils/convertBase64";

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

  const handleShow = React.useCallback(
    (e) => {
      e.preventDefault();
      if (convert && convert.FileData) {
        const url = decodeBase64(convert.FileData, "application/pdf");
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
        const url = decodeBase64(convert.FileData, "application/pdf");
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
      <div>
        {convert?.FileData && (
          <iframe
            src={decodeBase64(convert.FileData, "application/pdf")}
            width="100%"
            height="600px"
          ></iframe>
        )}
      </div>
    </main>
  );
}

export default App;
