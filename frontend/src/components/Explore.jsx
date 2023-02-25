import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImage } from "../redux/imageAction";
import MyCard from "./MyCard";
import Loading from "./Loading";
import FIlters from "./FIlters";
const Explore = () => {
  const { loading, img, error, success } = useSelector((state) => state.image);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllImage());
  }, []);

  return (
    <>
      <FIlters />
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
