import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { addEmployeeAPI } from "../apis/employee";

export default function AddEmployee() {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
  });
  const handleChange = (event) => {
    setEmployee({ ...employee, [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {
    addEmployeeAPI(employee)
      .then((res) => {
        console.log(res);
        if (res?.data?.id)
          setTimeout(() => {
            // navigate("/");7
            navigate(`/update/${res?.data?.id}`);
          }, 1000);
      })
      .catch((err) => {
        console.error(err.response.data);
        toast.error(err.response.data);
      });
  };
  return (
    <Container>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        Add Employee
      </Typography>

      <TextField
        style={{ margin: "10px" }}
        label="Name"
        name="name"
        onChange={(event) => handleChange(event)}
        placeholder="Enter Name"
        value={employee.name}
        fullWidth
      />
      <TextField
        style={{ margin: "10px" }}
        label="Email"
        name="email"
        onChange={(event) => handleChange(event)}
        placeholder="Enter Email"
        value={employee.email}
        fullWidth
      />

      <Button
        style={{ margin: "10px" }}
        onClick={() => handleSubmit()}
        fullWidth
        variant="contained"
      >
        Submit
      </Button>
    </Container>
  );
}
