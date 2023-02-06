import React from "react";
import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useParams } from "react-router-dom";

import axios from "axios";
import EditEmployee from "../views/EditEmployee";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "2",
  }),
}));
describe("AddEmployee", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const Component = (
    <Router>
      <EditEmployee />
    </Router>
  );

  it("rendres input and button", () => {
    const { getByTestId, getByLabelText, getByPlaceholderText } =
      render(Component);

    const emailInput = getByPlaceholderText("Enter Email");
    const nameInput = getByLabelText("Name");
    const button = getByTestId("employee-form");
    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("should render employee info", async () => {
    const mAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "additional",
          },
          {
            id: 18,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "primary",
          },
        ],
      },
    };
    jest.spyOn(axios, "get").mockResolvedValue(mAxiosResponse);

    render(Component);
    expect(await screen.findByDisplayValue("imena")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("imen@yahoo.fr")
    ).toBeInTheDocument();
  });
  it("should update employee data ", async () => {
    const mAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "additional",
          },
          {
            id: 18,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "primary",
          },
        ],
      },
    };
    const mockUpdateResponse = {
      data: {
        id: 2,
        name: "ben",
        email: "ben@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "additional",
          },
          {
            id: 18,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "primary",
          },
        ],
      },
    };
    const mockData = { name: "ben", email: "ben@yahoo.fr" };
    const url = "/updateEmployee/2";
    jest.spyOn(axios, "get").mockResolvedValue(mAxiosResponse);
    jest.spyOn(axios, "put").mockResolvedValue(mockUpdateResponse);

    axios.put.mockResolvedValue(mockUpdateResponse);

    const { getByLabelText } = render(Component);

    const emailInput = getByLabelText("Email");
    const nameInput = getByLabelText("Name");
    const button = screen.getByTestId("employee-form");

    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(nameInput, { target: { value: mockData.name } });
    act(() => fireEvent.click(button));
    expect(axios.put).toHaveBeenCalledWith(url, mockData);
  });
  it("should add employee primary address", async () => {
    const addressAxiosResponse = {
      id: 15,
      city: "Paris",
      street: "12 rue raouel",
      zip_code: "75820",
      type: "primary",
    };
    const employeeAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [],
      },
    };

    const mockData = {
      city: "Paris",
      street: "12 rue raouel",
      zip_code: "75820",
      type: "primary",
    };
    const url = "/2/addresses/add";
    jest.spyOn(axios, "get").mockResolvedValue(employeeAxiosResponse);
    jest.spyOn(axios, "post").mockResolvedValue(addressAxiosResponse);

    axios.post.mockResolvedValue(addressAxiosResponse);

    const { getByLabelText } = render(Component);
    const addButton = screen.getByTestId("show_primary_Form");
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(screen.getByTestId("primaryAddress-form")).toBeInTheDocument()
    );

    const streetInput = getByLabelText("Primary Address street");
    const cityInput = getByLabelText("Primary Address city");
    const zipCodeInput = screen.getByLabelText("Primary Address zip code");

    const button = screen.getByTestId("primaryAddress-form");

    fireEvent.change(streetInput, { target: { value: mockData.street } });
    fireEvent.change(cityInput, { target: { value: mockData.city } });
    fireEvent.change(zipCodeInput, { target: { value: mockData.zip_code } });
    act(() => fireEvent.click(button));
    expect(axios.post).toHaveBeenCalledWith(url, mockData);
    expect(axios.get).toHaveBeenCalled();
  });

  it("should update employee primary address", async () => {
    const addressAxiosResponse = {
      id: 15,
      city: "Paris",
      street: "25 rue mederic",
      zip_code: "75820",
      type: "primary",
    };
    const employeeAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue des fetes",
            zip_code: "75220",
            type: "primary",
          },
        ],
      },
    };

    const mockData = {
      id: 15,
      city: "Paris",
      street: "25 rue mederic",
      zip_code: "75820",
      type: "primary",
    };
    const url = "/2/addresses/update/15";
    jest.spyOn(axios, "get").mockResolvedValue(employeeAxiosResponse);
    jest.spyOn(axios, "put").mockResolvedValue(addressAxiosResponse);

    axios.put.mockResolvedValue(addressAxiosResponse);

    const { getByLabelText } = render(Component);
    const addButton = await screen.getByTestId("show_primary_Form");
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(screen.getByTestId("primaryAddress-form")).toBeInTheDocument()
    );
    const cityInput = await getByLabelText("Primary Address city");
    const zipCodeInput = await getByLabelText("Primary Address zip code");
    const streetInput = await screen.getByLabelText("Primary Address street");
   

    const button = screen.getByTestId("primaryAddress-form");

    
    fireEvent.change(cityInput, { target: { value: mockData.city } });
    fireEvent.change(zipCodeInput, { target: { value: mockData.zip_code } });
    fireEvent.change(streetInput, { target: { value:mockData.street} });
    act(() => fireEvent.click(button));
    expect(axios.put).toHaveBeenCalledWith(url, mockData);
    expect(axios.get).toHaveBeenCalled();
  });

  it("should update employee additional address", async () => {
    const addressAxiosResponse = {
      id: 15,
      city: "Paris",
      street: "25 rue mederic",
      zip_code: "75820",
      type: "additional",
    };
    const employeeAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue des fetes",
            zip_code: "75220",
            type: "additional",
          },
        ],
      },
    };

    const mockData = {
      id: 15,
      city: "Paris",
      street: "25 rue mederic",
      zip_code: "75820",
      type: "additional",
    };
    const url = "/2/addresses/update/15";
    jest.spyOn(axios, "get").mockResolvedValue(employeeAxiosResponse);
    jest.spyOn(axios, "put").mockResolvedValue(addressAxiosResponse);

    axios.put.mockResolvedValue(addressAxiosResponse);

    const { getByLabelText } = render(Component);
    await waitFor(() =>
    expect(screen.getByTestId("toggleUpdate15")).toBeInTheDocument()
  );
    const addButton =  screen.getByTestId("toggleUpdate15");
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(screen.getByTestId("additionalAddress-form")).toBeInTheDocument()
    );
    const cityInput = await getByLabelText("Additional Address city");
    const zipCodeInput = await getByLabelText("Additional Address zip code");
    const streetInput = await screen.getByLabelText("Additional Address street");
   

    const button = screen.getByTestId("additionalAddress-form");

    
    fireEvent.change(cityInput, { target: { value: mockData.city } });
    fireEvent.change(zipCodeInput, { target: { value: mockData.zip_code } });
    fireEvent.change(streetInput, { target: { value:mockData.street} });
    act(() => fireEvent.click(button));

    expect(axios.put).toHaveBeenCalledWith(url, mockData);
    expect(axios.get).toHaveBeenCalled();
  });
  it("should delete employee additional address", async () => {

    const employeeAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue des fetes",
            zip_code: "75220",
            type: "additional",
          },
        ],
      },
    };

 
    const url = "addresses/delete/15";
    jest.spyOn(axios, "get").mockResolvedValue(employeeAxiosResponse);
    render(Component);
    jest.spyOn(axios, "delete").mockResolvedValue({});


    await waitFor(() =>
    expect(screen.getByTestId("toggleDelete15")).toBeInTheDocument()
  );
    const deleteButton =  screen.getByTestId("toggleDelete15");
    fireEvent.click(deleteButton);
    await waitFor(() =>
      expect(screen.getByText("Are you sure to do this?")).toBeInTheDocument()
    );
  
  
    act(() => fireEvent.click(screen.getByText("Yes")));


    await act(async () => {
      await axios.delete.mock.results[0].value;
    });
    expect(axios.delete).toHaveBeenCalledWith(url);
  });

  it("should add employee additional address ", async () => {
    const addressAxiosResponse = {data:{
      id: 15,
      city: "Paris",
      street: "12 rue raouel",
      zip_code: "75820",
      type: "additional",
    }};
    const employeeAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [],
      },
    };

    const mockData = {
      city: "Paris",
      street: "12 rue raouel",
      zip_code: "75820",
      type: "additional",
    };
    const url = "/2/addresses/add";
    jest.spyOn(axios, "get").mockResolvedValue(employeeAxiosResponse);
    jest.spyOn(axios, "post").mockResolvedValue(addressAxiosResponse);

    axios.post.mockResolvedValue(addressAxiosResponse);

    const { getByLabelText } = render(Component);
    const addButton = screen.getByTestId("show_additional_Form");
    fireEvent.click(addButton);
    await waitFor(() =>
      expect(screen.getByTestId("additionalAddress-form")).toBeInTheDocument()
    );

    const streetInput = getByLabelText("Additional Address street");
    const cityInput = getByLabelText("Additional Address city");
    const zipCodeInput = screen.getByLabelText("Additional Address zip code");
    const button = screen.getByTestId("additionalAddress-form");

    fireEvent.change(streetInput, { target: { value: mockData.street } });
    fireEvent.change(cityInput, { target: { value: mockData.city } });
    fireEvent.change(zipCodeInput, { target: { value: mockData.zip_code } });
    act(() => fireEvent.click(button));
    expect(axios.post).toHaveBeenCalledWith(url, mockData);
    expect(axios.get).toHaveBeenCalled();
  });
  it("should not update employee data when submitting the form when getting the correct data", async () => {
    const mAxiosResponse = {
      data: {
        id: 2,
        name: "imena",
        email: "imen@yahoo.fr",
        employeeAddresses: [
          {
            id: 15,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "additional",
          },
          {
            id: 18,
            city: "Paris",
            street: "12 rue raouel",
            zip_code: "75820",
            type: "primary",
          },
        ],
      },
    };
    const mockUpdateResponse = {
      data: {},
    };
    const mockData = { name: "", email: "ben@yahoo.fr" };
    const url = "/updateEmployee/2";
    jest.spyOn(axios, "get").mockResolvedValue(mAxiosResponse);
    jest.spyOn(axios, "put").mockResolvedValue(mockUpdateResponse);

    axios.put.mockResolvedValue(mockUpdateResponse);

    const { getByLabelText } = render(Component);

    const emailInput = getByLabelText("Email");
    const nameInput = getByLabelText("Name");
    const button = screen.getByTestId("employee-form");

    fireEvent.change(emailInput, { target: { value: mockData.email } });
    fireEvent.change(nameInput, { target: { value: mockData.name } });
    act(() => fireEvent.click(button));
    expect(axios.put).toHaveBeenCalledWith(url, mockData);
  });
  test("should render employee with no addresses", async () => {
    const mAxiosResponse = {
      data: {
        id: 5,
        name: "imen2",
        email: "imen2@yahoo.fr",
        employeeAddresses: [],
      },
    };
    jest.spyOn(axios, "get").mockResolvedValue(mAxiosResponse);
    render(Component);
    expect(await screen.findByDisplayValue("imen2")).toBeInTheDocument();
    expect(
      await screen.findByDisplayValue("imen2@yahoo.fr")
    ).toBeInTheDocument();
    expect(
      await screen.getByText("No Primary address to display yet")
    ).toBeInTheDocument();
    expect(
      await screen.getByText("No Addional address to display yet")
    ).toBeInTheDocument();
  });
});
