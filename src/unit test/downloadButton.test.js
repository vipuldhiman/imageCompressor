import { render } from "@testing-library/react";
import DownloadButton from "../components/downloadButton";

test("renders download button with correct link", () => {
  const { getByText } = render(<DownloadButton image="test-image.jpg" />);
  const linkElement = getByText(/Download Compressed Image/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveAttribute("href", "test-image.jpg");
  expect(linkElement).toHaveAttribute("download", "compressed-image.jpg");
});