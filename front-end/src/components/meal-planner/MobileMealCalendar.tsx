import React from "react";
import { ReactElement } from "react";
import SRContainer from "../../sr-ui/SRContainer";
import SRFlex from "../../sr-ui/SRFlex";
import { useTranslation } from "react-i18next";
import moment from "moment-timezone";
import SRHeader from "../../sr-ui/SRHeader";

const MobileMealCalendar = (): ReactElement => {
  const { t } = useTranslation();

  const days = [0, 1, 2, 3, 4, 5, 6].map((day) =>
    moment().add(day, "days").format("dddd")
  );

  return (
    <SRContainer
      padding="none"
      maxWidth="max"
      borderWidth="xsmall"
      style={{ width: "100%" }}
    >
      <SRFlex direction="column" padding="none" width="max">
        {days.map((day) => (
          <SRFlex
            direction="column"
            alignItems="flex-start"
            style={{ borderBottom: "1px solid", width: "100%", padding: 8 }}
          >
            <SRHeader size="xsmall">{t(day)}</SRHeader>
          </SRFlex>
        ))}
      </SRFlex>
    </SRContainer>
  );
};

export default MobileMealCalendar;
