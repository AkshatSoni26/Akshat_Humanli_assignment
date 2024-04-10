import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
import axiosClient from "../utiles/axiosclient";
import routes, { backed_urls } from "../constants/routes";
import Loader from "../components/loader";
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseapp from "../firebase.js";


const db = getDatabase(firebaseapp);


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const starCountRef = ref(db, 'users/'+username+'/');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const login_details = { username, passward:password };
    // Here you can handle the submission logic, like sending data to server or validating the credentials
    console.log("login details:", login_details);

    setLoading(true)

    axiosClient
      .post(backed_urls.login, login_details)
      .then((e) => {
        console.log('e ===>', e)
        setLoading(false)
        if (e.status==200){
          localStorage.setItem('@user', e.data.id)
          navigate(routes.home)
        }
      })
      .catch((err) => {
      alert('something went wrong.')
        console.log("err ==>", err);
        setLoading(false)
      });

  };

  // onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //   console.log("data ===>", data)
  //   // updateStarCount(postElement, data);
  // });

  

  return (
    <>
    {
      !loading
      ?
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <div className="d-flex align-items-center">
              <input
                type={!isShow ? "password" : "text"}
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <span className="ms-2">
                {isShow ? (
                  <IoIosEyeOff onClick={() => setIsShow((show) => !show)} />
                ) : (
                  <IoIosEye onClick={() => setIsShow((show) => !show)} />
                )}
              </span>
            </div>
          </div>

          <button type="submit">Submit</button>
        </form>

      </div>
    </div>
    :
    <Loader />
  }
    </>
  );
}

export default Login;
