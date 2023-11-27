import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/AppHeader.scss";


function AppHeader() {
	const history = useNavigate();
		
	const handleLogout = () => {
		document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		history('/signin')
	}
	
	// 쿠키에서 값을 꺼내오는 함수
	function getCookieValue() {
		const cookieName = 'Authorization'; 
		const cookies = document.cookie.split(';');
		const cookie = cookies.find((c) => c.trim().startsWith(`${cookieName}=`));
	
		if (cookie) {
		const tokenString = cookie.split('=')[1].trim();
		const tokenValue = decodeURIComponent(tokenString);
		
		// Assuming Bearer token format: "Bearer <token>"
		const bearerToken = tokenValue.startsWith('Bearer ') ? tokenValue.slice(7) : tokenValue;
	
		return bearerToken;
		}
		return null;
	}
	
	// 토큰을 가져와서 디코딩하는 함수
	function decodeToken() {
		const token = getCookieValue();
	
		if (token) {
			const decodedToken = jwtDecode(token);
			console.log(decodedToken.sub);
			return decodedToken.sub;
		}
	
		return null;
	}

	
	return (
		<div className='AppHeader'>
			<div className='logo'>E-UN-DA</div>
			<div className='authButtons'>
				
			{document.cookie.split(';').some((cookie) => cookie.trim().startsWith('Authorization')) ? (
				// 'Authorization' 토큰이 존재할 때
				<>
					<button className='signInButton'>{ decodeToken() }</button>
					<button className='signInButton' onClick={handleLogout}>Logout</button>
				</>
			) : (
				// 'Authorization' 토큰이 존재하지 않을 때
				<>
					<Link to="/signup" style={{ textDecoration: 'none', color: 'black' }}>
						<button className='signUpButton'>SignUp</button>
					</Link>
					<Link to="/signin" style={{ textDecoration: 'none', color: 'black' }}>
						<button className='signInButton'>SignIn</button>
					</Link>
				</>
			)}
			</div>
		</div>
	);
}
export default AppHeader;