import React from "react";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
const Upload = () => {
  return (
    <>
      <div
        type="file"
        style={{
          height: "100%",
          width: "200px",
          marginInline: "auto",
          marginBlock: "20px",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <input
          style={{
            cursor: "pointer",
            position: "absolute",
            zIndex: "100",
            height: "40px",
            width: "180px",
            opacity: "0",
          }}
          type="file"
        />
        <DriveFolderUploadIcon style={{ fontSize: "48px" }} />
        <p style={{ textAlign: "center" }}>Upload Image</p>
      </div>
    </>
  );
};

export default Upload;
