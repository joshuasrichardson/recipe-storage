import React from "react";
import { ReactElement } from "react";
import SRContainer from "../../sr-ui/SRContainer";
import SRFlex from "../../sr-ui/SRFlex";
import SRHeader from "../../sr-ui/SRHeader";
import { useTranslation } from "react-i18next";
import MobileMealCalendar from "./MobileMealCalendar";
import DesktopMealCalendar from "./DesktopMealCalendar";

const MealPlanner = (): ReactElement => {
  const { t } = useTranslation();

  const isSmallScreen = window.innerWidth < 800;

  return (
    <SRFlex direction="column">
      <SRContainer padding="none" maxWidth="xlarge">
        <SRFlex direction="column" padding="large">
          <SRHeader size="large" underlined>
            {t("Meal Planner")}
          </SRHeader>
          {isSmallScreen ? <MobileMealCalendar /> : <DesktopMealCalendar />}
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default MealPlanner;
