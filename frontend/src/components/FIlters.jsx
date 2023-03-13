import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { allFilter, fetchAllImage, imageSearch } from "../redux/imageAction";
import { useDispatch } from "react-redux";
import TagFilter from "./Tagfilter";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const FIlters = ({ totalPages }) => {
  const tags = ["Tech", "English", "Student", "PC", "Reddit", "Sarcasm"];
  const [tag, setTag] = React.useState("");
  const [name, setName] = React.useState("");

  const [page, setPage] = useState(1);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(allFilter({ name: name, tags: tag, page: newPage }));
  };
  const [input, setInput] = useState({
    name: name,
    tags: tag,
    page: page,
  });

  const dispatch = useDispatch();
  const search = (e) => {
    e.preventDefault();
    console.log(input);
    dispatch(allFilter(input));
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
              setName(e.target.value);
            }}
            required
            value={name}
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
              setName("");
              setTag("");
              setPage(1);
              dispatch(allFilter({ name: "", tags: "", page: 1 }));
            }}
          >
            Reset
          </Button>
          <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Tag</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tag}
                label="Tag"
                onChange={(e) => {
                  dispatch(
                    allFilter({ name: "", tags: e.target.value, page: 1 })
                  );
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {tags.map((e) => {
                  return (
                    <MenuItem key={e} value={e}>
                      {e}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </>
  );
};

export default FIlters;
