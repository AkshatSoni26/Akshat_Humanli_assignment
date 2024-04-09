import React from 'react'
// import { getDatabase, ref, set } from "firebase/database";
// import firebaseapp from './firebase.js';
// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import routes from './constants/routes.js';
import Home from './pages/Home.jsx';
import ErrorBoundary from './components/error/ErrorBoundary.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';


// const auth = getAuth(firebaseapp);
// // const db = getDatabase(firebaseapp);
// const provider = new GoogleAuthProvider();

// function App() {

//   // const putData = () => {
//   //   set(ref(db, 'users/akshat'), {
//   //     username: 'akshat',
//   //     email: "email@gmail.com",
//   //     age: 21
//   //   });
//   // }

//   const siguupUser = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         console.log('result ====>', result)
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//       }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         console.log('errors ===>', error)
//         // ...
//       });
//     // createUserWithEmailAndPassword(auth, 'akshatsoni2604@gmail.com', 'Akshat@123').then((userCredential) => {
//     //   // Signed up 
//     //   const user = userCredential.user;
//     //   console.log('usercredentials ===>', userCredential)
//     //   // ...
//     // })
//     //   .catch((error) => {
//     //     const errorCode = error.code;
//     //     const errorMessage = error.message;
//     //   console.log('error ===>', error)
//     //     // ..
//     //   });
//   }

//   return (
//     <div className="App">
//       <button onClick={siguupUser}>Sign Up</button>
//       {/* <button onClick={putData}>Put Data</button> */}
//     </div>
//   );
// }




const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<Home />} path={routes.home} errorElement={<ErrorBoundary />} />,
    <Route
      element={<Login />}
      path={routes.login}
      errorElement={<ErrorBoundary />}
    />,
    <Route
      element={<Register />}
      path={routes.register}
      errorElement={<ErrorBoundary />}
    />,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}


export default App;