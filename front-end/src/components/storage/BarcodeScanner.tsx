import React, { useEffect, useState, ReactElement, useCallback } from "react";
// @ts-ignore
import config from "./BarcodeConfig.ts";
import Quagga from "quagga";
import "../../App.css";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRDropDown from "../../sr-ui/SRDropDown.tsx";

type ScannerProps = {
  onDetected: (newBarCode: string) => void;
};

const Scanner: React.FC<ScannerProps> = (props: ScannerProps): ReactElement => {
  const { onDetected } = props;
  const [showCamera, setShowCamera] = useState(false);
  const [barcodeConfig, setBarcodeConfig] = useState(config);

  const detected = useCallback(
    (result) => {
      onDetected(result.codeResult.code);
    },
    [onDetected]
  );

  useEffect(() => {
    try {
      Quagga.stop();
    } catch {}
    if (showCamera) {
      Quagga.init(barcodeConfig, (err) => {
        if (err) {
          console.log(err, "Quagga failed to initialize the barcode scanner");
        }
        Quagga.start();
      });

      Quagga.onDetected(detected);
    }
  }, [showCamera, detected, barcodeConfig]);

  const setCamera = () => {
    if (showCamera) Quagga.stop();
    setShowCamera(!showCamera);
  };

  const onTypeChange = (barcodeType: string) => {
    setBarcodeConfig({ ...config, decoder: { readers: [barcodeType] } });
  };

  const getOptions = () => {
    return [
      <option key="upc_reader" value="upc_reader">
        UPC (12 digits)
      </option>,
      <option key="ean_reader" value="ean_reader">
        EAN (13 digits)
      </option>,
      <option key="ean_8_reader" value="ean_8_reader">
        EAN 8 (8 digits)
      </option>,
    ];
  };

  return (
    <SRFlex direction="column" marginVertical="10px">
      <SRDropDown
        label="Barcode Type:"
        fixedOptions
        onChange={(e) => onTypeChange(e.target.value)}
        value={barcodeConfig.decoder.readers[0]}
        listName="barcodeType"
        marginBottom="medium"
      >
        {getOptions()}
      </SRDropDown>
      {showCamera && <div id="interactive" className="viewport"></div>}
      <SRButton onClick={setCamera}>
        {showCamera ? "Done Scanning" : "Start Scanning"}
      </SRButton>
    </SRFlex>
  );
};

export default Scanner;
