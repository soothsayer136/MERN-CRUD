import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axiosInterceptor from "../Interceptor/Interceptor";

import { fetchTasks } from "../redux/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";

function CreateTable() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const getAlltasks = async () => {
    try {
      const { data } = await axiosInterceptor.get(`/tasks`);
      dispatch(fetchTasks(data));
    } catch (e) {
      console.log({ e: "Unable to fetch users tasks" });
    }
  };

  useEffect(() => {
    getAlltasks();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">S.N.</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell align="left">Status</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left" width="15%">
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{task.title}</StyledTableCell>
                <StyledTableCell align="left">{task.status}</StyledTableCell>
                <StyledTableCell align="left">{task.date}</StyledTableCell>
                <StyledTableCell align="left">
                  <FontAwesomeIcon
                    className="faEdit"
                    icon={faEdit}
                  ></FontAwesomeIcon>
                  <FontAwesomeIcon
                    className="faTrash"
                    icon={faTrash}
                  ></FontAwesomeIcon>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CreateTable;
