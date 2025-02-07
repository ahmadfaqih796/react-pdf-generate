import React, { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import "./styles/form.style.css";
import "./styles/main.style.css";
import ConvertService from "./services/ConvertService";
import { decodeBase64 } from "./utils/convertBase64";

function App() {
  const [convert, setConvert] = useState(null);
  const [show, setShow] = useState(false);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("doc");

    console.log(file.size === 0 ? null : file);

    if (file.size === 0) {
      return alert("Please select a file");
    }

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
      alert("File uploaded successfully");
    } catch (error) {
      alert("Error uploading file");
      console.log("ggaagaga", error);
    }
  }, []);

  const handleReset = () => {
    setConvert(null);
    setShow(false);
  };

  const handleDownload = React.useCallback(
    (e) => {
      e.preventDefault();
      if (convert && convert.FileData) {
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
    <main className="container">
      <form
        className="form-container"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input className="input-file" type="file" name="doc" />
        <div>
          <button type="submit">Submit</button>
          <button type="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>
      <div>
        <button onClick={() => setShow(!show)}>View</button>
        <button onClick={handleDownload}>Download</button>
      </div>
      <div>
        {show && convert?.FileData && (
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
