import React from "react";
import { Link } from "react-router-dom";

export const ConditionalLink = ({ children, to, classN, condition }) =>
  !!condition && to ? (
    <Link className={classN} to={to}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );
