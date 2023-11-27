import React from "react";
import { Link } from "react-router-dom";
import "../styles/AppHeader.scss";


function AppHeader() {
	return (
		<div className='AppHeader'>
			<div className='logo'>E-UN-DA</div>
			<div className='authButtons'>
				<Link to={`/signup`} style={{ textDecoration: 'none', color: 'black' }}>
					<button className='signUpButton'>SignUp</button>
				</Link>
				<Link to={`/signin`} style={{ textDecoration: 'none', color: 'black' }}>
					<button className='signInButton'>SignIn</button>
				</Link>
			</div>
		</div>
	);
}
export default AppHeader;