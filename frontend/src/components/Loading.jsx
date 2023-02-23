import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "10px",
        }}
      >
        <CircularProgress />
      </div>
    </>
  );
};

export default Loading;
