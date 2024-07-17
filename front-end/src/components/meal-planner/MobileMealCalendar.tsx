import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import SRContainer from "../../sr-ui/SRContainer";
import SRFlex from "../../sr-ui/SRFlex";
import { useTranslation } from "react-i18next";
import SRHeader from "../../sr-ui/SRHeader";
import ServerFacade from "../../api/ServerFacade";
import { srDate } from "../../utils/utils";
import { MealPlan, Recipe } from "../../types";
import SRModal from "../../sr-ui/SRModal";
import MealRow from "./MealRow";

const MobileMealCalendar = (): ReactElement => {
  const { t } = useTranslation();
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [mealPlan, setMealPlan] = useState<MealPlan | undefined>();
  const [mealPlanIndex, setMealPlanIndex] = useState<number | undefined>();

  useEffect(() => {
    const initPlans = async (): Promise<void> => {
      setMealPlans(await ServerFacade.getMealPlans(srDate(), 7));
    };
    initPlans();
  }, []);

  useEffect(() => {
    if (!mealPlan) return;
    setMealPlans((prev) => [
      ...prev.slice(0, mealPlanIndex),
      mealPlan,
      ...prev.slice(mealPlanIndex + 1),
    ]);
  }, [mealPlan]);

  const openPlan = (plan: MealPlan, index: number) => {
    setMealPlan(plan);
    setMealPlanIndex(index);
  };

  const updateMealPlan = async (mealName: string, recipe: Recipe) => {
    ServerFacade.updateMealPlan(mealPlan, setMealPlan, mealName, recipe);
  };

  const updateMealPlanNameOnly = async (
    mealName: string,
    recipeName: string
  ) => {
    ServerFacade.updateMealPlanNameOnly(
      mealPlan,
      setMealPlan,
      mealName,
      recipeName
    );
  };

  return (
    <>
      <SRModal isOpen={!!mealPlan} onClose={() => setMealPlan(undefined)}>
        <SRHeader size="large">{mealPlan?.date.format("dddd")}</SRHeader>
        <SRFlex direction="column" alignItems="flex-start">
          <MealRow
            updateMealPlan={updateMealPlan}
            updateMealPlanNameOnly={updateMealPlanNameOnly}
            meal={mealPlan?.breakfast}
            mealName="Breakfast"
          />
          <MealRow
            updateMealPlan={updateMealPlan}
            updateMealPlanNameOnly={updateMealPlanNameOnly}
            meal={mealPlan?.lunch}
            mealName="Lunch"
          />
          <MealRow
            updateMealPlan={updateMealPlan}
            updateMealPlanNameOnly={updateMealPlanNameOnly}
            meal={mealPlan?.dinner}
            mealName="Dinner"
          />
        </SRFlex>
      </SRModal>
      <SRContainer
        padding="none"
        maxWidth="max"
        borderWidth="xsmall"
        style={{ width: "100%" }}
      >
        <SRFlex direction="column" padding="none" width="max">
          {mealPlans.map((plan, index) => (
            <SRFlex
              key={plan?.date.toISOString() || index}
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              style={{ borderBottom: "1px solid", width: "100%", padding: 8 }}
              onClick={() => openPlan(plan, index)}
            >
              <SRHeader size="medium">
                {t(plan?.date.format("dddd") || `${index}`)}
              </SRHeader>
            </SRFlex>
          ))}
        </SRFlex>
      </SRContainer>
    </>
  );
};

export default MobileMealCalendar;
