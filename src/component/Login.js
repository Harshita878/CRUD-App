import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const submitHandler = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("http://www.localhost:3000/user/login", {
        userName: userName,
        password: password
      })
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        console.log(res.data.user);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userName',res.data.user);
        setHasError(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.response.data.msg);
      });
  };

  return (
    <>
      {isLoading && (
        <div>
          <img style={{ width: "150px" }} src={loader} alt="loader" />
        </div>
      )}

      {!isLoading && (
        <div>
          <h1>Login</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">submit</button>
          </form>
        </div>
      )}

      {hasError && (
        <div>
          <p style={{ color: "red" }}>Error - {error}</p>
        </div>
      )}
    </>
  );
};

export default Login