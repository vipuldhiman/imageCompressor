import React from "react";

const ImageUploader = ({ onImageUpload }) => {
  return (
    <div>
      <input type="file" accept="image/*" onChange={onImageUpload} className="file-input" />
    </div>
  );
};

export default ImageUploader;