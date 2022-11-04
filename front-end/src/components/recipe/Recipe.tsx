import React, { useState, useEffect, ReactElement } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// @ts-ignore
import ServerFacade from "../../api/ServerFacade.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "../../sr-ui/Toaster.tsx";
// @ts-ignore
import SRButton from "../../sr-ui/SRButton.tsx";
// @ts-ignore
import SRFlex from "../../sr-ui/SRFlex.tsx";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";

type RecipeComponentState = {
  updated: boolean;
};

type RecipeComponentProps = {
  canEdit: boolean;
};

const RecipeComponent: React.FC<RecipeComponentProps> = ({
  canEdit = false,
}: RecipeComponentProps): ReactElement => {
  const location = useLocation();
  const state = location.state as RecipeComponentState;
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const updateScreen = async () => {
      if (state?.updated) {
        toast.success("Updated " + state.updated + "!", toastEmitter);
        state.updated = false;
      }
      if (recipe == null) {
        setRecipe(await ServerFacade.getRecipe(id));
      }
    };
    updateScreen();
  }, [state, id, recipe, setRecipe]);

  const deleteRecipe = () => {
    ServerFacade.deleteRecipe(id);
    navigate("/recipes", { state: { deleted: recipe.name } });
  };

  const getAttributes = () => {
    return [
      {
        key: "Time",
        value: recipe?.minutes ? recipe?.minutes + " minutes" : undefined,
      },
      { key: "Servings", value: recipe?.numServings },
      { key: "Materials", value: recipe?.materials },
      { key: "Ingredients", value: recipe?.ingredients },
      { key: "Steps", value: recipe?.steps, ol: true },
      { key: "Description", value: recipe?.description },
    ];
  };

  const getOptions = () => {
    if (canEdit) {
      return (
        <SRFlex>
          <SRButton
            size="small"
            onClick={() => navigate("/recipes", { state: recipe })}
          >
            <FontAwesomeIcon icon={solid("search")} />
          </SRButton>
          <SRButton
            size="small"
            onClick={() => navigate("/recipes/edit/" + recipe._id)}
          >
            <FontAwesomeIcon icon={solid("edit")} />
          </SRButton>
          <SRButton size="small" onClick={deleteRecipe}>
            <FontAwesomeIcon icon={solid("trash")} />
          </SRButton>
        </SRFlex>
      );
    }
  };

  return (
    <SRFlex justifyContent="center" padding="large">
      <SRBoxView
        key={recipe?._id}
        label={recipe?.name}
        titleSize="large"
        src={recipe?.imageUrl}
        link={recipe?.link}
        attributes={getAttributes()}
        maxWidth="xlarge"
      >
        {getOptions()}
      </SRBoxView>
    </SRFlex>
  );
};

export default RecipeComponent;
