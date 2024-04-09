// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1hdU6JrPzkapAiwS2ib1vMMmuf9GC8fw",
  authDomain: "chat-app-1bdba.firebaseapp.com",
  projectId: "chat-app-1bdba",
  storageBucket: "chat-app-1bdba.appspot.com",
  messagingSenderId: "250769165998",
  appId: "1:250769165998:web:aeae314e75cedafc2fa73f",
  measurementId: "G-327H84D9Z4",
  databaseURL:'https://chat-app-1bdba-default-rtdb.firebaseio.com'
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
export const firebaseAnalytics = getAnalytics(firebaseapp);


// Initialize Firebase Authentication and get a reference to the service
export const firbaseAuth = getAuth(firebaseapp);

export default firebaseapp
