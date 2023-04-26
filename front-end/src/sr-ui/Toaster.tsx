import React from "react";
import { ToastContainer, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToasterProps {
  autoClose?: number;
}

const Toaster: React.FC<ToasterProps> = ({ autoClose = 2000 }) => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={autoClose}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export const toastEmitter = ({ autoClose = 2000 }): ToastOptions<{}> => {
  return {
    position: "bottom-center",
    autoClose: autoClose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };
};

export default Toaster;
