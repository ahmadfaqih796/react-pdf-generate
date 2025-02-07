import React from "react";
import NanoService from "../services/NanoService";

const GeneratePdfV2 = () => {
  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("file");
    formData.append('file', file); 

    try {
      const config = {
        withCredentials: true  
      };

      console.log(config);
      const response = await NanoService.post(formData, config);
      console.log("masuk", response);
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
    </div>
  );
};

export default GeneratePdfV2;
