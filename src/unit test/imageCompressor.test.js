import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ImageCompressor from "../components/imageCompressor";
import Resizer from "react-image-file-resizer";
import "@testing-library/jest-dom";
import { act } from "react";

// Mock Resizer to simulate image compression
jest.mock("react-image-file-resizer", () => ({
  imageFileResizer: jest.fn((file, maxWidth, maxHeight, format, quality, rotation, callback) => {
    console.log("Mocked resizer called!");
    setTimeout(() => {
            callback("data:image/jpeg;base64,mocked-image");
    }, 100);
  }),
}));

// Mock global functions
global.alert = jest.fn();
global.URL.createObjectURL = jest.fn(() => "mock-url");

describe("ImageCompressor Component", () => {
  test("1️⃣ Rejects files larger than 5MB", () => {
    render(<ImageCompressor />);
    screen.debug();
    const fileInput = screen.getByTestId("file-input");

    // Create a dummy file larger than 5MB
    const largeFile = new File([new Array(6 * 1024 * 1024).fill("a").join("")], "large.jpg", { type: "image/jpeg" });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    expect(global.alert).toHaveBeenCalledWith("File size exceeds 5MB. Please upload a smaller file.");
  });

  test("2️⃣ Default compression should be 80%", () => {
    render(<ImageCompressor />);
    screen.debug();
    const slider = screen.getByLabelText(/Compression Quality/i);

    expect(slider).toHaveValue("80");
  });
});