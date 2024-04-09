import React, { ReactNode } from "react";
import { themeGreen, translucentBackground } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return <></>;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 100,
        }}
      >
        <div
          style={{
            background: "white",
            width: "90vw",
            height: "90vh",
            borderWidth: 8,
            borderColor: themeGreen,
            borderRadius: 6,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              background: translucentBackground,
              boxSizing: "border-box",
              borderWidth: 8,
              borderColor: themeGreen,
              borderRadius: 6,
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "auto",
            }}
          >
            <button
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                background: "none",
                border: "none",
                padding: 8,
                lineHeight: 1,
                fontSize: 28,
              }}
              onClick={onClose}
            >
              &#215;
            </button>
            <div style={{ padding: 16 }}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
