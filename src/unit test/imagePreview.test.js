import { render } from "@testing-library/react";
import ImagePreview from "../components/imagePreview";

test("renders image preview with correct label and image", () => {
  const { getByText, getByAltText } = render(
    <ImagePreview label="Original Image" image="test-image.jpg" />
  );

  expect(getByText("Original Image")).toBeInTheDocument();
  expect(getByAltText("Original Image")).toHaveAttribute("src", "test-image.jpg");
});