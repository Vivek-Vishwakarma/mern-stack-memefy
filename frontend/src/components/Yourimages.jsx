import { Container } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import MyCard from "./MyCard";

const Yourimages = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const userId = JSON.parse(localStorage.getItem("userToken"));
  const [img, setImg] = useState([]);
  const getImages = async () => {
    await axios
      .get(`http://localhost:5000/image/${userId.user._id}`)
      .then((response) => {
        console.log(response.data);
        setImg(response.data);
      });
  };
  useEffect(() => {
    getImages();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Your Images</h1>
      {loading ? (
        <Loading />
      ) : (
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            gap: 4,
            marginBlock: 5,
          }}
        >
          {img &&
            img.map((e) => {
              return <MyCard key={e._id} e={e} />;
            })}
        </Container>
      )}
    </>
  );
};

export default Yourimages;
