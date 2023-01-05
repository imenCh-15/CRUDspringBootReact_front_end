import axios from 'axios';
axios.defaults.baseURL='http://localhost:8080';

export const getEmployeesAPI=async(id)=>axios.get(`/employees`);

export const getEmployeeAPI=async(id)=>axios.get(`/getEmployee/${id}`);

export const addEmployeeAPI=async(employee)=>axios.post('/addEmployee',employee);

export const editEmployeeAPI=async(id,employee)=>axios.put(`/updateEmployee/${id}`,employee);

export const deleteEmployeeAPI=async(id)=>axios.delete(`/delete/${id}`);
