import React, { useEffect } from "react";
import config from "./barcode-config.json";
import Quagga from "quagga";
import "../App.css";

const Scanner = (props) => {
  const { onDetected } = props;

  const detected = (result) => {
    Quagga.stop();
    onDetected(result.codeResult.code);
  };

  useEffect(() => {
    Quagga.init(config, (err) => {
      if (err) {
        console.log(err, "Quagga failed to initialize the barcode scanner");
      }
      Quagga.start();
      return () => {
        Quagga.stop();
      };
    });

    //detecting boxes on stream
    Quagga.onProcessed((result) => {
      var drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter(function (box) {
              return box !== result.box;
            })
            .forEach(function (box) {
              Quagga.ImageDebug.drawPath(
                box,
                {
                  x: 0,
                  y: 1,
                },
                drawingCtx,
                {
                  color: "green",
                  lineWidth: 2,
                }
              );
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(
            result.box,
            {
              x: 0,
              y: 1,
            },
            drawingCtx,
            {
              color: "blue",
              lineWidth: 2,
            }
          );
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            {
              x: "x",
              y: "y",
            },
            drawingCtx,
            {
              color: "red",
              lineWidth: 3,
            }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, [detected]);

  return (
    // If you do not specify a target,
    // QuaggaJS would look for an element that matches
    // the CSS selector #interactive.viewport
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
