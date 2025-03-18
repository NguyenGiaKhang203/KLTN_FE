import React, { useEffect, useState } from 'react';
import Loading from '../../components/LoadingComponent/LoadingComponent';
import { useLocation } from 'react-router-dom';
// import './Homepage.css'
import { useNavigate } from 'react-router-dom'
import Hero from '../../components/HeroComponent/HeroComponent';

const HomePage = () => {
  // const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate()


  return (
    <div>
      <Hero />
    </div>
  );
};

export default HomePage;

