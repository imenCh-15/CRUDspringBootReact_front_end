import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Paper from "@mui/material/Paper";
import { IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { deleteEmployeeAPI, getEmployeesAPI } from "../apis/employee";
import { styled } from "@mui/material/styles";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";
import {  useNavigate } from "react-router-dom";
export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [id, setId] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const navigate = useNavigate();
  const navigateTo = (id) => navigate(`/update/${id}`);

  useEffect(() => {
    loadEmployee();
  }, []);

  const handleDelete = (id) => {
    setId(id);
    setOpenDeleteModal(true);
  };

  const handleClose = () => {
    setOpenDeleteModal(false);
  };

  const onDelete = () => {
    deleteEmployeeAPI(id).then((res) => {
    //setEmployees(employees.filter(obj=>obj.id!==id))
    loadEmployee();
      setTimeout(
        () => toast.success(`Employee with id ${id} deleted successfully`),
        1000
      );
    });
    setOpenDeleteModal(false);
  };

  const loadEmployee = () => {
    getEmployeesAPI().then((res) =>{ 
      setEmployees(res?.data)});
  };

  return (
    <Container>
      <TableContainer sx={{ marginTop: 2 }} component={Paper}>
        <ConfirmModal
          data-testid="deleteModal"
          open={openDeleteModal}
          text={"Confirm to delete employee"}
          onClose={handleClose}
          handleSubmit={onDelete}
        />
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Addresses</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.length>0&&employees.map((row) => (
              <TableRow
                key={row?.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row?.email}
                </TableCell>
                <TableCell>
                  {row?.employeeAddresses.map(
                    ({ id, street, zip_code, city, type }) => (
                      <li key={id}>{street + "," + city + "," + zip_code}</li>
                    )
                  )}
                  {(row?.employeeAddresses === null ||
                    row?.employeeAddresses.length === 0) && (
                    <p style={{ color: "DarkGray" }}>no addresses yet</p>
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                   // href={`/update/${row.id}`}
                    color="success"
                    variant="outlined"
                    data-testid={`editButton-${row.id}`}

                    onClick={()=>navigateTo(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    data-testid={`deleteButton-${row.id}`}
                    onClick={() => handleDelete(row.id)}
                    color="error"
                    variant="outlined"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
