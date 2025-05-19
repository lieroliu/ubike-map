import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/YouBike 臺北市查詢系統/i);
  console.log(linkElement);
  expect(linkElement).toBeInTheDocument();
});
