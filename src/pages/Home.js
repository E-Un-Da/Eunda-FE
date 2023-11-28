import React from 'react';
import LoginUserHome from './LoginUserHome';
import Motion from '../framer/Motion';
import '../styles/home.css';

const Home = () => {
  return (
    <>
      {/* < Motion /> */}
      <div class='container'>
        <div class='dropping-texts'>
          <div>Spring</div>
          <div>React</div>
          <div>Node</div>
          <div>E-UN-DA!</div>
        </div>
      </div>
      {LoginUserHome && <LoginUserHome />}
    </>
  );
};

export default Home;
