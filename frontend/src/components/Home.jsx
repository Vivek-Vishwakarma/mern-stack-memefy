import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserFromLocal } from "../redux/userSlice";
import Upload from "./Upload";
import Yourimages from "./Yourimages";

const Home = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      // console.log(localStorage.getItem("userToken"));
      dispatch(setUserFromLocal(JSON.parse(localStorage.getItem("userToken"))));
    } else {
      alert("Please login before accessing home page !!");
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Upload />
      <Yourimages />
    </>
  );
};

export default Home;
