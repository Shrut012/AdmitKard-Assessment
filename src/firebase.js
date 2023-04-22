import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBpnt8JRSAUhan6j1KDT7J103vy1r8Ft4Y",
	authDomain: "admitkard-7ce4b.firebaseapp.com",
	projectId: "admitkard-7ce4b",
	storageBucket: "admitkard-7ce4b.appspot.com",
	messagingSenderId: "476673695787",
	appId: "1:476673695787:web:67262359009a875a6a8a6e",
	databaseURL: "https://admitkard-7ce4b-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
