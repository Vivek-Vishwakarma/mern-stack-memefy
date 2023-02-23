import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllImage } from "../redux/imageAction";

const Explore = () => {
  const { loading, img, error, success } = useSelector((state) => state.image);
  const dispatch = useDispatch();

  console.log(img);
  useEffect(() => {
    dispatch(fetchAllImage());
  }, []);

  return (
    <>
      <button>click</button>
    </>
  );
};

export default Explore;
