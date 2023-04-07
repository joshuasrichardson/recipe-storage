import React, { useState, ReactElement } from "react";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRImage from "../../sr-ui/SRImage.tsx";

type UploaderProps = {
  setImage: Function;
};

const Uploader: React.FC = (props: UploaderProps): ReactElement => {
  const { setImage } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      {selectedImage && (
        <div>
          <SRImage
            label="Image not found"
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <SRButton onClick={() => setSelectedImage(null)}>
            Remove Image
          </SRButton>
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
