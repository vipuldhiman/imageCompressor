import React from "react";

const DownloadButton = ({ image }) => {
  return (
    <a href={image} download="compressed-image.jpg" className="download-btn">
      Download Compressed Image
    </a>
  );
};

export default DownloadButton;