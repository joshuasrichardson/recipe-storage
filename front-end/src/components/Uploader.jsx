import React, { useState } from "react";

const Uploader = (props) => {
  const { setImage } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <img
            alt="not fount"
            width={"250px"}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove Image</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
          setImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

export default Uploader;
