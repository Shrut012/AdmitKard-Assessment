import React, { useEffect } from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Signin = () => {
	const { googleSignIn, user } = UserAuth();
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			await googleSignIn();
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (user != null) {
			navigate("/profile");
		}
	}, [user, navigate]);

	return (
		<div className="signin">
			<h3>Connect with us</h3>
			<div className="max-w-[240px]  signin_btn">
				<GoogleButton onClick={handleGoogleSignIn} />
			</div>
		</div>
	);
};

export default Signin;
