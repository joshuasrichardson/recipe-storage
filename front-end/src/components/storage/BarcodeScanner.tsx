import React, { useEffect, useState, ReactElement } from "react";
// @ts-ignore
import config from "./BarcodeConfig.ts";
import Quagga from "quagga";
import "../../App.css";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";

type ScannerProps = {
  onDetected: Function;
};

const Scanner: React.FC = (props: ScannerProps): ReactElement => {
  const { onDetected } = props;
  const [showCamera, setShowCamera] = useState(false);

  const detected = (result) => {
    onDetected(result.codeResult.code);
  };

  useEffect(() => {
    if (showCamera) {
      Quagga.init(config, (err) => {
        if (err) {
          console.log(err, "Quagga failed to initialize the barcode scanner");
        }
        Quagga.start();
      });

      Quagga.onDetected(detected);
    } else {
      try {
        Quagga.stop();
      } catch {}
    }
  }, [showCamera, detected]);

  const setCamera = () => {
    if (showCamera) Quagga.stop();
    setShowCamera(!showCamera);
  };

  return (
    <SRFlex direction="column" marginVertical="10px">
      {showCamera && <div id="interactive" className="viewport"></div>}
      <SRButton onClick={setCamera}>
        {showCamera ? "Done Scanning" : "Start Scanning"}
      </SRButton>
    </SRFlex>
  );
};

export default Scanner;
