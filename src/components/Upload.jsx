import React, { useState } from "react";
/**
 * 
 * @returns 
 */
export function Upload() {
  const [spoilerFile, setFile] = useState("");

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      console.log("e.target.result", e.target.result);
      setFile(e.target.result);
    };
  };
  return (
    <>
      <h1>Upload spoiler JSON here!</h1>

      <input type="file" onChange={handleChange} />
      <br />
      {"-- Uploaded contents --" + spoilerFile}
    </>
  );
}
