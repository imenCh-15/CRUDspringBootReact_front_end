import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addEmployeeAPI } from "../apis/employee";

export default function AddEmployee() {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
  });
  const handleChange = (prop) => (event) => {
    console.log(event.target);
    setEmployee({ ...employee, [prop]: event.target.value });
  };
  const handleSubmit = () => {
    addEmployeeAPI(employee).then((res) => console.log(res));
    navigate("/");
  };
  return (
    <>
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
          name="name"
          onChange={handleChange("name")}
          placeholder="Enter Name"
          value={employee.name}
          fullWidth
        />
        <TextField
          style={{ margin: "10px" }}
          name="email"
          onChange={handleChange("email")}
          placeholder="Enter Email"
          value={employee.email}
          fullWidth
        />
        <TextField
          style={{ margin: "10px" }}
          name="address"
          onChange={handleChange("address")}
          placeholder="Enter Address"
          value={employee.address}
          fullWidth
        />
        <Button
          style={{ margin: "10px" }}
          onClick={handleSubmit}
          fullWidth
          variant="contained"
        >
          Submit
        </Button>
      </Container>
    </>
  );
}
