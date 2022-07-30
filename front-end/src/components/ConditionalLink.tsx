import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

export type ConditionalLinkParams = {
  children?: ReactElement;
  to: string;
  classN: string;
  condition: boolean;
};

const ConditionalLink: React.FC<ConditionalLinkParams> = ({
  children,
  to,
  classN,
  condition,
}: ConditionalLinkParams): ReactElement =>
  !!condition && to ? (
    <Link className={classN} to={to}>
      {children}
    </Link>
  ) : (
    <>{children}</>
  );

export default ConditionalLink;
