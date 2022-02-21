import React, { useState, useEffect } from "react";
import "../css/App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axiosInterceptor from "../Interceptor/Interceptor";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "@mui/material/Modal";

import { fetchUsers } from "../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";

function MyProfile() {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.users); //destructured state for its userProfile
  console.log(userProfile);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [Userdata, setuserData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
  });

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setuserData({ ...Userdata, [name]: value });
  };

  const getMyProfile = async () => {
    try {
      const { data } = await axiosInterceptor.get(`/users/me`);
      // setUser(data);
      dispatch(fetchUsers(data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { email, firstname, lastname, address } = Userdata;
  const handleUpdate = async (e) => {
    try {
      await axiosInterceptor.patch(`/users/myprofile/update`, {
        email,
        firstname,
        lastname,
        address,
      });
    } catch (e) {
      console.log(e);
    }

    e.preventDefault();
    console.log("hello");
  };
  return (
    <div className="container">
      <div className="dashboard-section">
        <div className="dashboard-inner-section">
          <h1>{userProfile.email ? userProfile.email : <p>Empty</p>}</h1>
          <h1>
            {userProfile.firstname ? userProfile.firstname : <p>Empty</p>}
          </h1>
          <h1>{userProfile.lastname ? userProfile.lastname : <p>Empty</p>}</h1>
          <h1>{userProfile.address ? userProfile.address : <p>Empty</p>}</h1>
          <Button className="reg-btn" onClick={handleOpen}>
            Update
          </Button>
        </div>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <div className="upper-table">
            <h2>Create Task</h2>{" "}
            <Button onClick={handleClose}>
              <FontAwesomeIcon
                className="faTrash"
                icon={faWindowClose}
              ></FontAwesomeIcon>
            </Button>
          </div>
          <p id="child-modal-description"></p>
          <TextField
            id="title"
            label="Email"
            name="title"
            type="text"
            value={userProfile.email}
            onChange={handleChange}
            variant="filled"
          />
          <TextField
            id="description"
            label="First Name"
            name="description"
            type="text"
            value={userProfile.firstname}
            onChange={handleChange}
            autoComplete="current-password"
            // variant="filled"
          />
          <TextField
            id="description"
            label="Last Name"
            name="description"
            type="text"
            value={userProfile.lastname}
            onChange={handleChange}
            autoComplete="current-password"
            // variant="filled"
          />
          <TextField
            id="description"
            label="Address"
            name="description"
            type="text"
            value={userProfile.address}
            onChange={handleChange}
            autoComplete="current-password"
            // variant="filled"
          />

          <Button className="create-btn" onClick={handleUpdate}>
            Save Update&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faEdit}
              style={{ fontSize: 18 }}
            ></FontAwesomeIcon>
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MyProfile;
