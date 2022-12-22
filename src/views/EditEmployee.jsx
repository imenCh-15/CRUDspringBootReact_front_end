import { Button, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editEmployeeAPI, getEmployeeAPI } from "../apis/employee";

export default function AddEmployee() {

    let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [oldEmployee, setOldEmployee] = useState({
    name: "",
    email: "",
    address: "",
  });

  const { id } = useParams();

  useEffect(() => {
   loadEmployee()
  }, []);

  const loadEmployee=()=>{
    getEmployeeAPI(id).then((res) => {setEmployee(res.data)
    setOldEmployee(res.data)});
  }

  const handleChange = (prop) => (event) => {
    console.log(event.target);
    setEmployee({ ...employee, [prop]: event.target.value });
  };
  const handleSubmit = () => {
   
   editEmployeeAPI(id,employee).then(res=>console.log(res.data))
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
         Edit Employee
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
          disabled={oldEmployee.name===employee.name&&oldEmployee.address===employee.address&&oldEmployee.email===employee.email}
        >
          Submit
        </Button>
      </Container>
    </>
  );
}
