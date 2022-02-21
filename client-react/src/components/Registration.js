import React, { useState } from "react";
import axios from "axios";
import "../css/App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import Register from "../image/register.svg";
import { Link } from "react-router-dom";

const Form = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [firstname, setFirstname] = useState("");
  //   const [lastname, setLastname] = useState("");
  //   const [address, setAddress] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const URL = process.env.REACT_APP_API_URL;
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = user;
    try {
      await axios.post(`${URL}users`, {
        email: email,
        password: password,
      });
      setUser({ email: "", password: "" });
    } catch (e) {
      console.log(e);
    }
    // const res = await fetch(`${URL}/users`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });
    // const data = await res.json();
    // if (data.status === 422 || !data) {
    //   console.log("Invalid Registration");
    // } else {
    //   console.log("Successful Registration");
    // }
  };
  return (
    <div className="container">
      <div className="wrapper">
        <form>
          <h1 className="reg-h1">Sign Up</h1>
          <TextField
            variant="standard"
            label="Email"
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            inputProps={{
              startAdorment: (
                <InputAdornment position="start">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            className="input"
            variant="standard"
            label="Password"
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            variant="conatained"
            size="large"
            className="reg-btn"
          >
            Register
          </Button>
          <p style={{ fontWeight: 600 }}>
            Are you already registered ?{" "}
            <Link to="/" style={{ textDecoration: "none" }}>
              Sign In
            </Link>
          </p>
        </form>
        <img src={Register} className="img-register" />
      </div>
    </div>
  );
};

export default Form;
