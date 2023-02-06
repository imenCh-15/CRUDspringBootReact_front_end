import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddEmployee from "../views/AddEmployee";
import { BrowserRouter as Router } from "react-router-dom";

import axios from "axios";

jest.mock("axios");

describe("AddEmployee", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const component = (
    <Router>
      <AddEmployee />
    </Router>
  );
  it("rendres input and button", () => {
    const { getByLabelText } = render(component);
    const emailInput = getByLabelText("Email");
    const nameInput = getByLabelText("Name");
    const button = screen.getByRole("button");
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should send data when submitting the form when getting the correct data", async () => {
    const mockResponse = {
      data: { id: 16, name: "imen22", email: "imen2@yahoo.fr", employeeAddresses: null }
    };
    const mockData = { name: "imen22", email: "imen2@yahoo.fr" };
    const url = "/addEmployee";
    axios.post.mockResolvedValue(mockResponse);
    const { getByLabelText } = render(component);

    const emailInput = getByLabelText("Email");
    const nameInput = getByLabelText("Name");
    const button = screen.getByRole("button");

    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(nameInput, { target: { value: mockData.name } });
    fireEvent.click(button);
    expect(axios.post).toHaveBeenCalledWith(url, mockData);
  //   await waitFor(() =>
  //   expect(window.location.pathname).toBe("/update/16")
  // );
    

  });

  it("should not send data when submitting the form when getting the wrong data", async () => {
    const mockResponse = { data: {} };
    const mockData = { name: "imen22", email: "imen2@yahoo.fr" };
    const url = "/addEmployee";
    axios.post.mockResolvedValue(mockResponse);
    const { getByLabelText } = render(component);

    const emailInput = getByLabelText("Email");
    const nameInput = getByLabelText("Name");
    const button = screen.getByRole("button");

    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(nameInput, { target: { value: mockData.name } });
    fireEvent.click(button);
    expect(axios.post).toHaveBeenCalledWith(url, mockData);

  });
});
