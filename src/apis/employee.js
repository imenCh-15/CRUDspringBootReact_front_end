import axios from 'axios';
axios.defaults.baseURL='http://localhost:8080';

export const getEmployeesAPI=async(id)=>axios.get(`/employee/employees`);

export const getEmployeeAPI=async(id)=>axios.get(`/employee/employee/${id}`);

export const addEmployeeAPI=async(employee)=>axios.post('/employee/add',employee);

export const editEmployeeAPI=async(id,employee)=>axios.put(`/employee/employee/${id}`,employee);

export const deleteEmployeeAPI=async(id)=>axios.delete(`/employee/delete/${id}`);
