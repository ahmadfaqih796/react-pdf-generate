import React from "react";
import NanoService from "../services/NanoService";

const GeneratePdfV2 = () => {
  const [convert, setConvert] = React.useState(null);

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    formData.append("file", file);

    try {
      const config = {
        withCredentials: true,
        responseType: "blob",
      };
      console.log(config);
      const response = await NanoService.post(formData, config);
      console.log("masuk", response.data);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      console.log("qqqqqqq", url);
      setConvert(url);
      alert("File uploaded successfully");
    } catch (error) {
      console.log(error);
      alert("Error uploading file");
    }
  }, []);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await NanoService.get();
      console.log("masuk", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Generate</button>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" />
        <button type="submit">Submit</button>
      </form>
      {convert && (
        <>
          <iframe src={convert} width="100%" height="600px"></iframe>
        </>
      )}
    </div>
  );
};

export default GeneratePdfV2;
