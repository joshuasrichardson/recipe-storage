import React, { useState, useRef } from "react";
import { ReactElement, useEffect } from "react";
import { themeGreen } from "./styles";
import { Child } from "../types";

interface SRScrollContainerProps {
  children: Child;
  style?: object;
}

const SRScrollContainer = ({
  style,
  children,
}: SRScrollContainerProps): ReactElement => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [showTopBorder, setShowTopBorder] = useState(false);
  const [showBottomBorder, setShowBottomBorder] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (modalContentRef.current) {
        setShowTopBorder(modalContentRef.current.scrollTop > 8);
        setShowBottomBorder(
          modalContentRef.current.scrollTop +
            modalContentRef.current.clientHeight <
            modalContentRef.current.scrollHeight - 8
        );
      }
    };

    if (modalContentRef.current) {
      modalContentRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (modalContentRef.current) {
        modalContentRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div
      ref={modalContentRef}
      style={{
        maxHeight: "100%",
        overflow: "auto",
        borderTop: showTopBorder ? `1px solid ${themeGreen}` : "none",
        borderBottom: showBottomBorder ? `1px solid ${themeGreen}` : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default SRScrollContainer;
