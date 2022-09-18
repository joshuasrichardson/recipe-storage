import React from "react";
import { render, act } from "@testing-library/react";
// @ts-ignore
import BarcodeScanner from "../BarcodeScanner.tsx";
import { createRoot } from "react-dom/client";

let container: HTMLElement = null;
let root = null;

jest.mock("quagga", () => () => "TODO");

beforeEach(() => {
  act(() => {
    container = document.createElement("div");
    root = createRoot(container);
  });
});

afterEach(() => {
  act(() => {
    root.unmount();
    container.remove();
  });
  container = null;
  root = null;
});

describe("BarcodeScanner", () => {
  it("renders the dropdown and start button initially", () => {
    const intro = render(<BarcodeScanner onDetected={() => {}} />, root);

    expect(intro.container).toMatchInlineSnapshot(`
<div>
  <div
    style="margin: auto; display: flex; align-items: center; justify-content: space-between; flex-direction: column; width: 100%; flex-wrap: nowrap; padding: 0px;"
  >
    <label
      style="display: inline-block; margin-top: 10px; width: 100%; color: rgb(0, 56, 21); text-shadow: 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0, 0px 0px 6px #f0e3d0; font-size: 1.1em; text-align: left; padding-right: 5px;"
    >
      Barcode Type:
    </label>
    <select
      id="barcodeType"
      style="padding: 5px; font-size: 1.1em; width: 100%; background-color: inherit; border: solid; border-radius: 4px; border-width: 1.5px; border-color: #003815; margin-bottom: 10px;"
    >
      <option
        value="upc_reader"
      >
        UPC (12 digits)
      </option>
      <option
        value="ean_reader"
      >
        EAN (13 digits)
      </option>
      <option
        value="ean_8_reader"
      >
        EAN 8 (8 digits)
      </option>
    </select>
    <button
      style="color: rgb(224, 214, 206); background-color: rgb(139, 0, 0); font-weight: bold; border-radius: 5px; border-width: 1.5px; border-style: solid; border-color: #003815; display: flex; align-items: center; justify-content: center; padding: 20px; width: 200px; max-width: 300px; margin: 12px;"
      type="button"
    >
      Start Scanning
    </button>
  </div>
</div>
`);
  });
});
