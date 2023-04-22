import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import {
	MdEdit,
	MdEmail,
	MdPhone,
	MdOutlineLocationOn,
	MdMale,
	MdCalendarMonth,
} from "react-icons/md";
import { GiBigDiamondRing } from "react-icons/gi";

import Modal from "react-modal";
import "./styles.css";

const indianStates = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttar Pradesh",
	"Uttarakhand",
	"West Bengal",
];

Modal.setAppElement("#root");

const Profile = () => {
	const navigate = useNavigate();
	const { logOut, user } = UserAuth();

	const [genModal, setGenModal] = useState(false);
	const [docId, setDocId] = useState();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		dob: "",
		gender: "",
		state: "",
		maritalStatus: "",
	});
	const [userData, setUserData] = useState({
		name: "",
		email: "",
		phone: "",
		dob: "",
		gender: "",
		state: "",
		maritalStatus: "",
	});

	// useEffect(() => {
	// 	async function loadData() {
	// 		const documentRef = doc(db, `users/${user.displayName}/data/${docId}`);
	// 		const documentSnapshot = await getDoc(documentRef);
	// 		if (documentSnapshot.exists()) {
	// 			const currentData = documentSnapshot.data();
	// 			const tempData = { ...currentData, ...userData };
	// 			// console.log("tempdata", tempData);
	// 			console.log("userdata ", userData);
	// 			setUserData(tempData);
	// 		}
	// 	}
	// 	loadData();
	// }, []);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleGenderChange = (value) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			gender: value,
		}));
	};

	const handleMaritalStatusChange = (value) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			maritalStatus: value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		// console.log(event);
		const formData = new FormData(event.target); // Creates a new FormData object from the form
		console.log("formdata", formData);
		const formDataObj = Object.fromEntries(formData.entries()); // Converts the FormData object to a plain object

		console.log(formDataObj);
		saveFormDataToDatabase(formDataObj);
	};

	async function saveFormDataToDatabase(formDataObj) {
		const { name, email, phone, dob, gender, state, maritalStatus } = formData;

		setUserData({ name, email, phone, dob, gender, state, maritalStatus });
		// console.log(userData);

		// console.log("docId before: ", docId);
		if (docId) {
			const documentRef = doc(db, `users/${user.displayName}/data/${docId}`);
			const documentSnapshot = await getDoc(documentRef);
			if (documentSnapshot.exists()) {
				// The document already exists, so update it
				const currentData = documentSnapshot.data();
				const updatedData = { ...currentData, ...formData };
				await updateDoc(documentRef, updatedData);
				console.log("Document successfully updated!");
			}
		} else {
			// The document does not exist, so create it
			await addDoc(collection(db, `users/${user.displayName}/data`), {
				name,
				email,
				phone,
				dob,
				gender,
				state,
				maritalStatus,
			})
				.then((docRef) => {
					console.log("Document written with ID: ", docRef.id, docRef);
					setDocId(docRef.id);
					//close the modal and clear the form data
					setGenModal(false);
				})
				.catch((error) => {
					console.error("Error adding document: ", error);
				});
		}
		setGenModal(false);
		console.log("docId after: ", docId);
	}

	const handleSignOut = async () => {
		try {
			await logOut();
			navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="profile" style={{ backgroundColor: "#eee" }}>
			<div className="generalInfo">
				<div className="profilePic">
					<img src={user.photoURL} alt="profile pic" />
				</div>
				<div className="info">
					<div className="name">
						<h1>{user?.displayName}</h1>
						<button onClick={() => setGenModal(true)} className="edit_btn">
							<MdEdit />
						</button>
					</div>
					<div className="otherInfo1">
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdEmail /> {user.email}
						</span>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdPhone />
							{userData.phone}
						</span>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdMale />
							{userData.gender}
						</span>
					</div>
					<div className="otherInfo2">
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdOutlineLocationOn />
							India
						</span>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdOutlineLocationOn />
							{userData.state}
						</span>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<MdCalendarMonth />
							{userData.dob}
						</span>
						<span
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<GiBigDiamondRing /> {userData.maritalStatus}
						</span>
					</div>
				</div>
			</div>

			<div>
				<h2>Your study preferences</h2>
				<div className="studyPreferences">
					<div className="leftdiv">
						<div style={{ width: "90%" }}>course</div>
						<div style={{ width: "90%" }}>country preferences</div>
						<div style={{ width: "90%" }}>prefered course</div>
						<div style={{ width: "90%" }}>specialisation</div>
					</div>
					<div className="rightdiv">
						<div style={{ width: "90%" }}>course</div>
						<div style={{ width: "90%" }}>course</div>
						<div style={{ width: "90%" }}>course</div>
					</div>
				</div>
			</div>

			<div className="experience">
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<h2>Experience</h2>
					<button>+</button>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "flex-end",
					}}
				>
					<h5>Total work experience </h5>
					<p>10 years</p>
				</div>
			</div>

			<div className="education">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<h2>Education</h2>
					<button>+</button>
				</div>
			</div>

			<button onClick={handleSignOut} className="logout_btn">
				Logout
			</button>

			<Modal
				isOpen={genModal}
				onRequestClose={() => setGenModal(false)}
				contentLabel="Example Modal"
				className="Modal"
				overlayClassName="Overlay"
			>
				<h2>Enter Details</h2>
				<form onSubmit={handleSubmit}>
					<label className="Label">
						Name:
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
							className="Input"
						/>
					</label>
					<br />
					<label className="Label">
						Email:
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							className="Input"
						/>
					</label>
					<br />
					<label className="Label">
						Phone:
						<input
							type="tel"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
							className="Input"
						/>
					</label>
					<br />
					<label className="Label">
						Date of Birth:
						<input
							type="date"
							name="dob"
							value={formData.dob}
							onChange={handleChange}
							required
							className="Input"
						/>
					</label>
					<br />

					<div className="ButtonGroup">
						<input type="hidden" name="gender" value={formData.gender} />
						<button
							type="button"
							className={
								formData.gender === "male" ? "Button active" : "Button"
							}
							onClick={() => handleGenderChange("male")}
						>
							Male
						</button>
						<button
							type="button"
							className={
								formData.gender === "female" ? "Button active" : "Button"
							}
							onClick={() => handleGenderChange("female")}
						>
							Female
						</button>
						<button
							type="button"
							className={
								formData.gender === "other" ? "Button active" : "Button"
							}
							onClick={() => handleGenderChange("other")}
						>
							Other
						</button>
					</div>

					<br />
					<label className="Label">
						State:
						<select name="state" value={formData.state} onChange={handleChange}>
							<option value="">Select State</option>
							{indianStates.map((state) => (
								<option key={state} value={state}>
									{state}
								</option>
							))}
						</select>
					</label>
					<br />

					<div className="ButtonGroup">
						<input
							type="hidden"
							name="maritalStatus"
							value={formData.maritalStatus}
						/>
						<button
							type="button"
							className={
								formData.maritalStatus === "married"
									? "Button active"
									: "Button"
							}
							onClick={() => handleMaritalStatusChange("married")}
						>
							Married
						</button>
						<button
							type="button"
							className={
								formData.maritalStatus === "unmarried"
									? "Button active"
									: "Button"
							}
							onClick={() => handleMaritalStatusChange("unmarried")}
						>
							Unmarried
						</button>
					</div>
					<br />
					<div className="modal_btn">
						<button
							onClick={() => setGenModal(false)}
							style={{
								marginTop: "20px",
								width: "4rem",
								height: "2rem",
								borderRadius: "4px",
							}}
							className="cancel_btn"
						>
							Cancel
						</button>
						<button
							style={{
								marginTop: "20px",
								width: "4rem",
								height: "2rem",
								borderRadius: "4px",
							}}
							type="submit"
							className="submit_btn"
						>
							Save
						</button>
					</div>
				</form>
			</Modal>
		</div>
	);
};

export default Profile;
