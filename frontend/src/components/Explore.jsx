import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allFilter, fetchAllImage } from "../redux/imageAction";
import MyCard from "./MyCard";
import Loading from "./Loading";

import FIlters from "./FIlters";
const Explore = () => {
  const { loading, img, error, success, totalPages } = useSelector(
    (state) => state.image
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allFilter({ name: "", tags: "", page: 1 }));
  }, []);

  return (
    <>
      <FIlters totalPages={totalPages} />

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

export default Explore;
