import React from "react";

const ImagePreview = ({ label, image }) => {
  return (
    <div className="image-box">
      <p>{label}</p>
      {image && <img src={image} alt={label} />}
    </div>
  );
};

export default ImagePreview;