import React from "react";
import "../styles/AppHeader.scss";


function AppHeader() {
	return (
		<div className='AppHeader'>
			<div className='logo'>E-UN-DA</div>
			<div className='authButtons'>
				<button className='signUpButton'>SignUp</button>
				<button className='signInButton'>SignIn</button>
			</div>
		</div>
	);
}
export default AppHeader;