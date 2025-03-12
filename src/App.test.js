import { render } from "@testing-library/react";
import App from "./App";

test("renders Image Compressor app without crashing", () => {
  const { getByText } = render(<App />);
  expect(getByText("Image Compressor")).toBeInTheDocument();
});