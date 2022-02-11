import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

it("renders the navbar", () => {
  expect(screen.getByText(/531 Calculator/i)).toBeInTheDocument();
  expect(screen.getAllByText("About")[0]).toBeInTheDocument();
});

it("renders the calc method toggle", () => {
  expect(screen.getByLabelText("Calculate By Training Max")).toBeInTheDocument();
  expect(screen.getByLabelText("Calculate By 1RM")).toBeInTheDocument();
});

it("renders the bar type toggle", () => {
  expect(screen.getByLabelText("Standard Olympic Bar")).toBeInTheDocument();
  expect(screen.getByLabelText("Curl Bar")).toBeInTheDocument();
});

it("renders the lift cards", () => {
  expect(screen.getByText("Bench Press")).toBeInTheDocument();
  expect(screen.getByText("Squat")).toBeInTheDocument();
  expect(screen.getByText("Overhead Press")).toBeInTheDocument();
  expect(screen.getByText("Deadlift")).toBeInTheDocument();
});

it("renders the calculate and reset buttons", () => {
  expect(screen.getByText("Calculate")).toBeInTheDocument();
  expect(screen.getByText("Reset")).toBeInTheDocument();
});