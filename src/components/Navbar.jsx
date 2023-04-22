import React from "react";
import "../pages/styles.css";

const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-light bg-light">
				<img
					src="https://assets.admitkard.com/images/admitkard_logo.svg"
					className="d-inline-block align-top navbar"
					alt="logo"
					style={{ width: "10rem" }}
				/>
			</nav>
		</>
	);
};

export default Navbar;
