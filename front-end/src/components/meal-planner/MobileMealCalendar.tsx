import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import SRContainer from "../../sr-ui/SRContainer";
import SRFlex from "../../sr-ui/SRFlex";
import { useTranslation } from "react-i18next";
import SRHeader from "../../sr-ui/SRHeader";
import ServerFacade from "../../api/ServerFacade";
import { srDate } from "../../utils/utils";
import { MealPlan } from "../../types";
import SRModal from "../../sr-ui/SRModal";
import MealRow from "./MealRow";

const MobileMealCalendar = (): ReactElement => {
  const { t } = useTranslation();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan | undefined>();

  useEffect(() => {
    const initPlans = async (): Promise<void> => {
      setMealPlans(await ServerFacade.getMealPlans(srDate(), 7));
    };
    initPlans();
  }, []);

  const openPlan = (plan: MealPlan) => {
    setMealPlan(plan);
  };

  console.log(mealPlans);
  return (
    <>
      <SRModal isOpen={!!mealPlan} onClose={() => setMealPlan(undefined)}>
        <SRHeader size="large">{mealPlan?.date.format("dddd")}</SRHeader>
        <SRFlex direction="column" alignItems="flex-start">
          <MealRow meal={mealPlan?.breakfast} mealName="Breakfast" />
          <MealRow meal={mealPlan?.lunch} mealName="Lunch" />
          <MealRow meal={mealPlan?.dinner} mealName="Dinner" />
        </SRFlex>
      </SRModal>
      <SRContainer
        padding="none"
        maxWidth="max"
        borderWidth="xsmall"
        style={{ width: "100%" }}
      >
        <SRFlex direction="column" padding="none" width="max">
          {mealPlans.map((plan) => (
            <SRFlex
              key={plan.date.toISOString()}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              style={{ borderBottom: "1px solid", width: "100%", padding: 8 }}
              onClick={() => openPlan(plan)}
            >
              <SRHeader size="medium">{t(plan.date.format("dddd"))}</SRHeader>
            </SRFlex>
          ))}
        </SRFlex>
      </SRContainer>
    </>
  );
};

export default MobileMealCalendar;
