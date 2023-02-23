import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Upload from "./Upload";
import Yourimages from "./Yourimages";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
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
