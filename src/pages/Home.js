import React from "react";
import LoginUserHome from './LoginUserHome';
import Motion from '../framer/Motion';


const Home = () => {
	return <>
		< Motion />
		{ LoginUserHome && <LoginUserHome /> }
	</>
}

export default Home;