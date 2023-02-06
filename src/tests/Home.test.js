import React from "react";
import axios from "axios";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Home from "../views/Home";

jest.mock("axios");

describe("Component", () => {
  test("should render employees with nos addresses", async () => {
    const mAxiosResponse = {
      data: [
        {
          id: 5,
          name: "imen2",
          email: "imen2@yahoo.fr",
          employeeAddresses: [],
        },
      ],
    };
    jest.spyOn(axios, "get").mockResolvedValueOnce(mAxiosResponse);
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(await screen.findByText("imen2")).toBeInTheDocument();
    expect(await screen.findByText("imen2@yahoo.fr")).toBeInTheDocument();
    expect(await screen.getByText("no addresses yet")).toBeInTheDocument();
    expect(await screen.getByTestId("DeleteIcon")).toBeInTheDocument();
    expect(await screen.getByTestId("EditIcon")).toBeInTheDocument();
  });

  test("should render employees", async () => {
    const mAxiosResponse = {
      data: [
        {
          id: 2,
          name: "imena",
          email: "imen@yahoo.fr",
          employeeAddresses: [
            {
              id: 15,
              city: "Paris",
              street: "12 rue raouel",
              zip_code: "75820",
              type: "addional",
            },
          ],
        },
      ],
    };
    jest.spyOn(axios, "get").mockResolvedValueOnce(mAxiosResponse);
    render(
      <Router>
        <Home />
      </Router>
    );
    expect(await screen.findByText("imena")).toBeInTheDocument();
    expect(await screen.findByText("imen@yahoo.fr")).toBeInTheDocument();
    expect(await screen.getByTestId("DeleteIcon")).toBeInTheDocument();
    expect(await screen.getByTestId("EditIcon")).toBeInTheDocument();
  });

  it("it redirects after click", async () => {
    const mockedUsedNavigate = jest.fn();

    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockedUsedNavigate,
    }));
    const mAxiosResponse = {
      data: [
        {
          id: 2,
          name: "imena",
          email: "imen@yahoo.fr",
          employeeAddresses: [
            {
              id: 15,
              city: "Paris",
              street: "12 rue raouel",
              zip_code: "75820",
              type: "primary",
            },
            {
              id: 16,
              city: "Paris",
              street: "12 rue raouel",
              zip_code: "75825",
              type: "addional",
            },
          ],
        },
      ],
    };

    jest.spyOn(axios, "get").mockResolvedValueOnce(mAxiosResponse);

    render(
      <Router>
        <Home />
      </Router>
    );
    await waitFor(() =>
      expect(screen.getByTestId("editButton-2")).toBeInTheDocument()
    );

    const button = await screen.getByTestId("editButton-2");
    fireEvent.click(button);
    expect(window.location.pathname).toBe("/update/2");
  });

  test("should delete employee", async () => {
    jest.spyOn(axios, "delete").mockResolvedValue({});
    const mAxiosResponse = {
      data: [
        {
          id: 2,
          name: "imena",
          email: "imen@yahoo.fr",
          employeeAddresses: [
            {
              id: 15,
              city: "Paris",
              street: "12 rue raouel",
              zip_code: "75820",
              type: "addional",
            },
          ],
        },
        {
          id: 3,
          name: "imen3",
          email: "imen3@yahoo.fr",
          employeeAddresses: [
            {
              id: 18,
              city: "Paris",
              street: "12 rue raouel",
              zip_code: "75820",
              type: "addional",
            },
          ],
        },
      ],
    };
    jest.spyOn(axios, "get").mockResolvedValue(mAxiosResponse);
    render(
      <Router>
        <Home />
      </Router>
    );
    await waitFor(() =>
      expect(screen.getByTestId("deleteButton-2")).toBeInTheDocument()
    );
    const deleteButton = screen.getByTestId("deleteButton-2");

    fireEvent.click(deleteButton);
    expect(screen.getByText("Are you sure to do this?")).toBeInTheDocument();
    expect(screen.getByText("Confirm to delete employee")).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
    act(() => fireEvent.click(screen.getByText("Yes")));

    await act(async () => {
      await axios.delete.mock.results[0].value;
    });

    //await waitFor(()=>expect( screen.getByRole('alert')).toBeInTheDocument());

    const updatedTable = screen.getByText("imen3");
    expect(updatedTable).toBeInTheDocument();
  });
});
