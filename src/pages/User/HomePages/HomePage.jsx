import React, { useEffect, useState } from "react";
import Loading from "../../../components/LoadingComponent/LoadingComponent";
import { useLocation } from "react-router-dom";
import ForgotPasswordPage from "../ForgotPasswordPages/ForgotPasswordPage";
import { useNavigate } from "react-router-dom";
import Hero from "../../../components/HeroComponent/HeroComponent";
import ChessInforComponent from "../../../components/ChessInforComponent/ChessInforComponent";
import Slideshow from "../../../components/SlideShowComponent/SlideShowComponent";
import FlexibleLearningProgram from "../../../components/FlexibleProgramComponent/FlexibleProgramComponent";
import GalleryComponent from "../../../components/GallaryComponents/GallaryComponents";
import BlogPage from "../BlogPages/BlogPage";

import banner1 from "../../../assets/banner.png";
import banner2 from "../../../assets/banner2.png";
import banner3 from "../../../assets/banner3.png";
import banner4 from "../../../assets/banner4.png";
import banner5 from "../../../assets/banner5.png";


const featureImageList = [
  { image: banner1 },
  { image: banner2 },
  { image: banner3 },
  { image: banner4 },
  { image: banner5 },
];
console.log("Feature Image List:", featureImageList);
const HomePage = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div>
      <Hero />
      <ChessInforComponent />
      <Slideshow featureImageList={featureImageList} />
      <FlexibleLearningProgram />
      <GalleryComponent />
    </div>
  );
};

export default HomePage;
