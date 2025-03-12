import { render, fireEvent } from "@testing-library/react";
import ImageUploader from "../components/imageUploader";

test("calls onImageUpload when file is selected", () => {
  const mockOnImageUpload = jest.fn();
  const { getByTestId } = render(<ImageUploader onImageUpload={mockOnImageUpload} />);
  
  // Ensure the file input is correctly selected
  const inputElement = getByTestId("file-input");

  // Simulate file selection
  fireEvent.change(inputElement, {
    target: { files: [new File([""], "test.jpg", { type: "image/jpeg" })] }
  });

  // Verify that the event handler was called
  expect(mockOnImageUpload).toHaveBeenCalled();
});