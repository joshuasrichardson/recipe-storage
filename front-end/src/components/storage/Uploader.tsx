import React, { useState, ReactElement } from "react";
import SRButton from "../../sr-ui/SRButton";
import SRImage from "../../sr-ui/SRImage";
import { useTranslation } from "react-i18next";

type UploaderProps = {
  setImage: Function;
};

const Uploader: React.FC = (props: UploaderProps): ReactElement => {
  const { setImage } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const { t } = useTranslation();

  return (
    <div>
      {selectedImage && (
        <div>
          <SRImage
            label={t("Image not found")}
            src={URL.createObjectURL(selectedImage)}
          />
          <br />
          <SRButton onClick={() => setSelectedImage(null)}>
            {t("Remove Image")}
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
