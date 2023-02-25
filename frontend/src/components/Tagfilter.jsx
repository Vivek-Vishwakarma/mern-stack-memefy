import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function TagFilter() {
  const tags = ["Tech", "English", "Student", "PC"];
  const [tag, setTag] = React.useState("");

  const handleChange = (event) => {
    setTag(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Tag</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tag}
          label="Tag"
          onChange={handleChange}
        >
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
  );
}
