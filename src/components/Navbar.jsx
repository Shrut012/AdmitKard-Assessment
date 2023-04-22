import React from "react";
import "../pages/styles.css";
import { UserAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../pages/styles.css";

const Navbar = () => {
	const { user } = UserAuth();
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location.pathname);
	const isHomePage = location.pathname === "/";
	console.log(isHomePage);

	const navigateCall = () => {
		if (user) {
			navigate("/profile");
		} else {
			navigate("/signin");
		}
	};

	return (
		<div style={{ padding: "5px" }}>
			<nav className="navbar navbar-light bg-light">
				<img
					src="https://assets.admitkard.com/images/admitkard_logo.svg"
					className="d-inline-block align-top navbarImg"
					alt="logo"
				/>

				{isHomePage && (
					<div className="start_btndiv">
						<button
							type="button"
							className="btn-primary btn start_btn"
							onClick={navigateCall}
						>
							Lets Get Started
						</button>
					</div>
				)}
			</nav>
		</div>
	);
};

export default Navbar;
