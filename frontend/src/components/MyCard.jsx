import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import { useSelector } from "react-redux";
import Mymodal from "./Mymodal";

export default function MyCard({ e }) {
  const { loading, img, error, success } = useSelector((state) => state.image);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const convertDate = (date) => {
    const utcDate = new Date(date);
    return utcDate.toLocaleString();
  };
  const handleOpen = () => setOpen(true);

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar alt={e.userId.name} src={e.userId.image} />}
          title={capitalizeFirstLetter(e.userId.name)}
          subheader={convertDate(e.createdAt)}
        />
        <CardMedia
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
          component="img"
          height="250"
          image={e.imgUrl}
          alt="Paella dish"
        />
        <Mymodal open={open} setOpen={setOpen} img={e.imgUrl} />
        <CardContent>
          <Typography variant="subtitle1">
            {capitalizeFirstLetter(e.name)}
          </Typography>
          {e.tags.map((ele) => {
            return (
              <Chip
                sx={{ marginRight: 1, fontWeight: "bold" }}
                key={ele}
                label={ele}
                color="success"
                size="small"
                variant="filled"
              />
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
