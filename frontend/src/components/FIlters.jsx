import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { fetchAllImage, imageSearch } from "../redux/imageAction";
import { useDispatch } from "react-redux";
import TagFilter from "./Tagfilter";
const FIlters = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const search = (e) => {
    e.preventDefault();
    dispatch(imageSearch(input));
  };
  return (
    <>
      <div
        style={{
          width: "70%",
          marginInline: "auto",
          marginBlock: "20px",
        }}
      >
        <form
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onSubmit={search}
        >
          <TextField
            id="outlined-basic"
            size="small"
            label="Search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            required
            value={input}
            sx={{ width: "80%" }}
            variant="outlined"
          />
          <button
            type="submit"
            style={{
              outline: "none",
              border: "none",
              backgroundColor: "transparent",
            }}
          >
            <SearchIcon
              sx={{ marginInline: "10px", fontSize: "35px", cursor: "pointer" }}
            />
          </button>
        </form>
        <div
          style={{
            marginBlock: "20px",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            size="small"
            color="error"
            onClick={() => {
              setInput("");
              dispatch(fetchAllImage());
            }}
          >
            Reset
          </Button>
          <TagFilter />
        </div>
      </div>
    </>
  );
};

export default FIlters;
