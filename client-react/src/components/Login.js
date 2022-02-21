import axios from "axios";
import React, { useState } from "react";
import "../css/App.css";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import Register from "../image/register.svg";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { loggedIn } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

const URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.users);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(URL);
    // console.log(`${URL}users/login`);

    try {
      const loginUser = await axios.post(`${URL}users/login`, {
        withCredentitals: true,
        // credentials: "include",
        email,
        password,
      });
      const { token } = loginUser.data;
      localStorage.setItem("jwt", token);
      dispatch(loggedIn(true));

      navigate("/dashboard");
    } catch (e) {
      console.log({ e: "Login failed" });
      console.log(e);
    }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <img src={Register} className="img-login" />
        <form>
          <h1>Sign In</h1>
          <TextField
            variant="standard"
            label="Email"
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className="input"
            variant="standard"
            label="Password"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="conatained"
            size="large"
            className="reg-btn"
          >
            Log In
          </Button>
          <p>
            {" "}
            Don't have account?{" "}
            <Link to="/register" style={{ textDecoration: "none" }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
