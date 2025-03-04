import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import ImageUploader from "./imageUploader";
import ImagePreview from "./imagePreview";
import DownloadButton from "./downloadButton";
import "../assets/styles.css"; 

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(80);
  const [loading, setLoading] = useState(false);

  // Handles file upload and passes it for compression
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setOriginalImage(file); // Store actual File object
      setCompressedImage(null);
      resizeImage(file, compressionQuality);
    }
  };

  // Compress image properly using Resizer
  const resizeImage = (file, quality) => {
    if (!file) return;

    setLoading(true);
    Resizer.imageFileResizer(
      file,
      800, // Max width
      600, // Max height
      "JPEG", // Output format
      quality, // Compression quality
      0, // No rotation
      (uri) => {
        setCompressedImage(uri); // Store base64 URI
        setLoading(false);
      },
      "base64"
    );
  };

  // Handles slider change and recompresses the image
  const handleQualityChange = (event) => {
    const newQuality = Number(event.target.value);
    setCompressionQuality(newQuality);
    if (originalImage) {
      resizeImage(originalImage, newQuality);
    }
  };

  return (
    <div className="compressor-container">
      <h2>Image Compressor</h2>

      <ImageUploader onImageUpload={handleImageUpload} />

      <div className="slider-container">
        <label>Compression Quality: {compressionQuality}%</label>
        <input
          type="range"
          min="10"
          max="100"
          value={compressionQuality}
          onChange={handleQualityChange}
          className="slider"
        />
      </div>

      {loading && <p>Compressing...</p>}

      <div className="image-container">
        {originalImage && (
          <ImagePreview label="Original Image" image={URL.createObjectURL(originalImage)} />
        )}
        {compressedImage && <ImagePreview label="Compressed Image" image={compressedImage} />}
      </div>

      {compressedImage && <DownloadButton image={compressedImage} />}
    </div>
  );
};

export default ImageCompressor;