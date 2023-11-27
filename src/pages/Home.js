import React from "react";
import LoginUserHome from './LoginUserHome';

const Home = () => {
	return <>
		{ LoginUserHome && <LoginUserHome /> }
	</>
}

export default Home;