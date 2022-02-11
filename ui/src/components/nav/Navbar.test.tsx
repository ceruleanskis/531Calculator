import { fireEvent, render, screen } from "@testing-library/react";
import Navbar from "./Navbar";
import userEvent from "@testing-library/user-event";
// import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import App from "App";

beforeEach(() => {
  render(<App />);
});

test("full app rendering/navigating", () => {
  const leftClick = { button: 0 };

  userEvent.click(screen.getAllByText(/about/i)[0], leftClick);
  expect(screen.getByText(/531 Calculator is an app/i)).toBeInTheDocument();

  fireEvent.click(screen.getByTitle("531 Calculator"));
  expect(screen.getByText(/curl bar/i)).toBeInTheDocument();
});
