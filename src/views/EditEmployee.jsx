import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from '@mui/icons-material/EditOff';
import DeleteIcon from "@mui/icons-material/Delete";


import { toast } from "react-toastify";

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEmployeeAddressesAPI,
  deleteAddressAPI,
  updateEmployeeAddressesAPI,
} from "../apis/address";
import { editEmployeeAPI, getEmployeeAPI } from "../apis/employee";

export default function AddEmployee() {
  let navigate = useNavigate();

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
  });
  const [oldEmployee, setOldEmployee] = useState({
    name: "",
    email: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [additionalAddress, setAdditionalAddress] = useState({
    city: "",
    street: "",
    zip_code: "",
    type:""
  });
  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [primaryAddress, setPrimaryAddress] = useState({
    city: "",
    street: "",
    zip_code: "",
    type:""
  });
  const [oldPrimaryAddress, setOldPrimaryAddres] = useState({});
  const [showForm, setShowForm] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    loadEmployee();
  }, []);
  useEffect(() => {
    setOldPrimaryAddres(
      addresses.filter((address) => address.type === "primary")[0]
    );
    setPrimaryAddress(
      addresses.filter((address) => address.type === "primary")[0]
    );
  }, [addresses]);

  const loadEmployee = () => {
    getEmployeeAPI(id).then((res) => {
      setEmployee(res.data);
      setOldEmployee(res.data);
      setAddresses(res.data.employeeAddresses);
    });
  };
  const submitPrimaryAddress = (event) => {
    event.preventDefault();

    const newAddress = { ...primaryAddress, type: "primary" };
    addEmployeeAddressesAPI(id, newAddress).then((res) => {
      if (res?.data?.errorMessage) toast.warning(res.data.errorMessage);
      setPrimaryAddress(res.data);
      setOldPrimaryAddres(res.data);
      loadEmployee();
      setShowForm(false);
    });
  };
  const updatePrimaryAddress = (event) => {
    event.preventDefault();

    const newAddress = { ...primaryAddress, type: "primary" };
    updateEmployeeAddressesAPI(id, oldPrimaryAddress.id, newAddress).then(
      (res) => {
        if (res?.data?.errorMessage) toast.warning(res.data.errorMessage);
        setPrimaryAddress(res.data);
        setOldPrimaryAddres(res.data);
        loadEmployee();
        setShowForm(false);
      }
    );
  };
  const submitAddionalAddress = (event) => {
    event.preventDefault();
    console.log("submitAddionalAddress");

  
      addEmployeeAddressesAPI(id, {...additionalAddress,type:"addional"}).then((res) => {
        setAdditionalAddress({ city: "",
        street: "",
        zip_code: "",
        type:""})
      if (res?.data?.errorMessage)
      return toast.warning(res.data.errorMessage);
      setAdditionalAddress(res.data);
      loadEmployee();
      setShowAdditionalForm(false);
    }
    )
   
  };
  const updateAddionalAddess = (event) => {
    console.log("updateAddionalAddess");
    event.preventDefault();
    updateEmployeeAddressesAPI(id, additionalAddress.id, additionalAddress).then(
      (res) => {
        if (res?.data?.errorMessage)
        return  toast.warning(res.data.errorMessage);
        setAdditionalAddress(res.data);
        loadEmployee();
        setShowAdditionalForm(false);
      }
    );
  };

  const handleChange = (prop) => (event) => {
    setEmployee({ ...employee, [prop]: event.target.value });
  };
  const handleChangeAddress = (prop) => (event) => {
    setPrimaryAddress({ ...primaryAddress, [prop]: event.target.value });
  };
  const handleChangeAddionalAddress = (prop) => (event) => {
   setAdditionalAddress({ ...additionalAddress, [prop]: event.target.value });
  };
  const handleSubmit = () => {
    editEmployeeAPI(id, { name: employee.name, email: employee.email }).then(
      (res) => console.log(res.data)
    );
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const toggleUpdate = (obj) => {
    setShowAdditionalForm(true);
    setAdditionalAddress(obj);
  };
  const deleteAddress=(id)=>{
    deleteAddressAPI(id).then((res) => {
      console.log(res.data);
      loadEmployee();
    });

  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography
        variant="h6"
        noWrap
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
      <Grid spacing={2} container sx={{ padding: 2 }}>
        <Grid item xs={8}>
          <Paper
            sx={{
              marginLeft: "16px",
              padding: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: "flex",
                fontFamily: "monospace",
                marginLeft: 1.5,
                fontWeight: 400,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Employee Info
            </Typography>

            <TextField
              style={{ margin: "10px" }}
              name="name"
              onChange={handleChange("name")}
              placeholder="Enter Name"
              value={employee.name}
            />
            <TextField
              style={{ margin: "10px" }}
              name="email"
              onChange={handleChange("email")}
              placeholder="Enter Email"
              value={employee.email}
            />

            <Button
              style={{ margin: "10px" }}
              onClick={handleSubmit}
              variant="contained"
              disabled={
                oldEmployee.name === employee.name &&
                oldEmployee.address === employee.address &&
                oldEmployee.email === employee.email
              }
            >
              Submit
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ padding: 1, display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: "flex",
                fontFamily: "monospace",
                marginLeft: 0.5,
                fontWeight: 400,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Primary address:
            </Typography>
            <List dense component="div" role="list">
              {addresses
                .filter((address) => address.type === "primary")
                .map(({ id, street, city, zip_code }) => (
                  <div key={id}>
                    <ListItem role="listitem">
                      <ListItemText>
                        {street + "," + city + "," + zip_code}
                      </ListItemText>
                    </ListItem>
                  </div>
                ))}
            </List>
            {showForm && (
              <>
                <TextField
                  style={{ margin: "10px" }}
                  onChange={handleChangeAddress("street")}
                  placeholder="Enter street"
                  value={primaryAddress?.street}
                  variant="standard"
                />
                <TextField
                  style={{ margin: "10px" }}
                  onChange={handleChangeAddress("city")}
                  placeholder="Enter City"
                  value={primaryAddress?.city}
                  variant="standard"
                />
                <TextField
                  style={{ margin: "10px" }}
                  onChange={handleChangeAddress("zip_code")}
                  placeholder="Enter Zip Code"
                  value={primaryAddress?.zip_code}
                  variant="standard"
                />
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={
                    oldPrimaryAddress?.city
                      ? updatePrimaryAddress
                      : submitPrimaryAddress
                  }
                  disabled={
                    !primaryAddress?.city &&
                    !primaryAddress?.street &&
                    !primaryAddress?.zip_code
                  }
                >
                  {oldPrimaryAddress?.city ? "update" : "add"} primary address
                </Button>
              </>
            )}
            {!showForm && (
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setShowForm(true)}
              >
                {oldPrimaryAddress?.city ? "update" : "add"} primary address
              </Button>
            )}

            {addresses.filter((address) => address.type === "primary")
              .length === 0 && (
              <h6
                sx={{
                  marginLeft: "5px",
                }}
              >
                No Primary address to display yet
              </h6>
            )}
            <Divider variant="inset" sx={{ marginLeft: 0 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                display: "flex",
                fontFamily: "monospace",
                marginLeft: 0.5,
                fontWeight: 400,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Addional addresses:
            </Typography>
            {addresses.filter((address) => address.type === "additional")
              .length === 0 && (
              <h6
                sx={{
                  marginLeft: "5px",
                }}
              >
                No Addional address to display yet
              </h6>
            )}

            <List dense component="div" role="list">
         
              {addresses
                .filter((address) => address.type !== "primary")
                .map((obj) => (
                  <div key={obj?.id}>
                    <ListItem
                      role="listitem"
                      secondaryAction={
                       <Stack direction="row" spacing={2}><IconButton
                          edge="end"
                          aria-label="edit"
                          onClick={() => toggleUpdate(obj)}
                          //isabled={obj.id===additionalAddress?.id}
                        >
                         {/* {!showAdditionalForm&& <EditIcon />} */}
                         {showAdditionalForm&&obj.id===additionalAddress.id&&obj!==additionalAddress?<EditOffIcon/>:<EditIcon />}
                        </IconButton>
                         <IconButton
                          color="error"
                         edge="end"
                         aria-label="delete"
                         onClick={()=>deleteAddress(obj?.id)}
                         //isabled={obj.id===additionalAddress?.id}
                       >
                      <DeleteIcon />
                       </IconButton>
                       </Stack> 
                      }
                    >
                      <ListItemText>
                        {obj?.street + "," + obj?.city + "," + obj?.zip_code}
                      </ListItemText>
                    </ListItem>
                  </div>
                ))}
            </List>
            {showAdditionalForm && (
              <>
                <TextField
                  style={{ margin: "10px" }}
                    onChange={handleChangeAddionalAddress("street")}
                  placeholder="Enter street"
                  value={additionalAddress?.street}
                  variant="standard"
                />
                <TextField
                  style={{ margin: "10px" }}
                  onChange={handleChangeAddionalAddress("city")}
                  placeholder="Enter City"
                  value={additionalAddress?.city}
                  variant="standard"
                />
                <TextField
                  style={{ margin: "10px" }}
                  onChange={handleChangeAddionalAddress("zip_code")}
                  placeholder="Enter Zip Code"
                  value={additionalAddress?.zip_code}
                  variant="standard"
                />
                <Button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={
                    additionalAddress?.id
                      ? updateAddionalAddess
                      : submitAddionalAddress
                  }
                  disabled={
                    !additionalAddress?.city &&
                    !additionalAddress?.street &&
                    !additionalAddress?.zip_code
                  }
                >
                  {additionalAddress?.id ? "update" : "add"} additional address
                </Button>
              </>
            )}
             {!showAdditionalForm&&
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => setShowAdditionalForm(true)}
              >
               add additional address
              </Button>
            }

           
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
