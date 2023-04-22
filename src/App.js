import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signin from "./pages/SignIn";
import Profile from "./pages/Profile";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route exact path="/" element={<HomePage />}></Route>
				<Route path="/signin" element={<Signin />} />
				<Route path="/profile" element={<Profile />}></Route>
			</Routes>
		</>
	);
}

export default App;
