import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/employee';

export const getEmployeeAddressesAPI = async (id) => axios.get(`/${id}/addresses`);

export const addEmployeeAddressesAPI = async (id, address) =>
  axios.post(`/${id}/addresses/add`, address);

export const updateEmployeeAddressesAPI = async (id, addressId, address) =>
  axios.put(`/${id}/addresses/update/${addressId}`, address);

export const deleteAddressAPI = async (id) => axios.delete(`addresses/delete/${id}`);
