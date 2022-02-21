import React, { useState, useEffect } from "react";
import "../css/App.css";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faWindowClose,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axiosInterceptor from "../Interceptor/Interceptor";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import CreateTable from "./CreateTable";
import Sidebar from "./Sidebar";

import { useSelector } from "react-redux";

const URL = process.env.REACT_APP_API_URL;
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

function Dashboard() {
  const { isTableDisplay } = useSelector((state) => state.tasks);
  // console.log(isTableDisplay);
  const [datevalue, setDatevalue] = useState(null);

  const [createTask, setCreateTask] = useState({
    title: "",
    description: "",
    status: "Pending",
    date: null,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const date = new Date();

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setCreateTask({ ...createTask, [name]: value });
  };
  const { title, description, status } = createTask;

  const handleSubmit = async () => {
    try {
      await axiosInterceptor.post(`/tasks`, {
        title,
        description,
        status,
        date: datevalue,
      });
    } catch (e) {}
  };

  return (
    <div className="container">
      <div className="dashboard-section">
        <div className="dashboard-inner-section">
          <div className="upper-table">
            {isTableDisplay ? <h1>Display Table</h1> : <h1>Dashboard</h1>}
            <Button className="create-btn" onClick={handleOpen}>
              <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>&nbsp;&nbsp;
              Create Task
            </Button>
          </div>
          {isTableDisplay ? <CreateTable /> : null}
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
            label="Title"
            name="title"
            type="text"
            value={createTask.title}
            onChange={handleChange}
            variant="filled"
          />
          <TextField
            id="description"
            label="Description"
            name="description"
            type="text"
            value={createTask.description}
            onChange={handleChange}
            autoComplete="current-password"
            // variant="filled"
          />

          <Box sx={{ width: 220 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="status"
                value={createTask.status}
                onChange={handleChange}
                label="Status"
                // onChange={handleChange}
              >
                <MenuItem value={"Completed"}>Completed</MenuItem>
                <MenuItem value={"Pending"}>Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              name="date"
              value={datevalue}
              onChange={(newValue) => {
                setDatevalue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <Button className="create-btn" onClick={handleSubmit}>
            Create Task&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faSave}
              style={{ fontSize: 18 }}
            ></FontAwesomeIcon>
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default Dashboard;
