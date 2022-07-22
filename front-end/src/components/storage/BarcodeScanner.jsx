import React, { useEffect, useState } from "react";
import config from "./BarcodeConfig.js";
import Quagga from "quagga";
import "../../App.css";

const Scanner = (props) => {
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
    <div className="container">
      {showCamera && <div id="interactive" className="viewport"></div>}
      <button className="obvious" onClick={setCamera}>
        {showCamera ? "Done Scanning" : "Start Scanning"}
      </button>
    </div>
  );
};

export default Scanner;
