import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Carousel from "react-bootstrap/Carousel";
import i1 from "../images/i1.jpg";
import i2 from "../images/i2.jpg";
import i3 from "../images/i3.jpg";

import "./styles.css";

const HomePage = () => {
	const { user } = UserAuth();
	const navigate = useNavigate();
	const navigateCall = () => {
		if (user) {
			navigate("/profile");
		} else {
			navigate("/signin");
		}
	};
	return (
		<div style={{ background: "#eee" }}>
			<div className="div_1">
				<h1>Welcome to AdmitKard!</h1>
				<h5>Apply to universities globally in easy steps.</h5>
			</div>

			<div className="div_2" style={{ margin: "6rem 3rem" }}>
				{/* carousel */}
				<div className="carousel">
					<Carousel controls={false}>
						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={i1}
								alt="First slide"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Carousel.Item>
						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={i2}
								alt="First slide"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Carousel.Item>
						<Carousel.Item interval={2000}>
							<img
								className="d-block w-100"
								src={i3}
								alt="First slide"
								style={{ maxWidth: "100%", maxHeight: "100%" }}
							/>
						</Carousel.Item>
					</Carousel>
				</div>

				<div className="more_info">
					<h7>
						Fill your details in{" "}
						<span style={{ fontWeight: "bold" }}>2 minutes</span>
					</h7>
					<h7>
						Get your{" "}
						<span style={{ fontWeight: "bold" }}>
							Profile Assessment Report (PAR)
						</span>
					</h7>
					<h7>
						Get <span style={{ fontWeight: "bold" }}>expert guidance</span> for
						your journey
					</h7>
				</div>
			</div>

			<div className="start_btndiv">
				<button
					type="button"
					className="btn-primary btn-lg btn start_btn"
					onClick={navigateCall}
				>
					Lets Get Started
				</button>
			</div>
		</div>
	);
};

export default HomePage;
