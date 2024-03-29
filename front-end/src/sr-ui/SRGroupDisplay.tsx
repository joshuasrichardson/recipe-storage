import React, { useContext, useState, useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
import { toastEmitter } from "./Toaster";
import SRButton from "./SRButton";
import SRButtonLink from "./SRButtonLink";
import SRFlex from "./SRFlex";
import SRContainer from "./SRContainer";
import SRHeader from "./SRHeader";
import SRText from "./SRText";
import { Context } from "../App";
import { ContextType } from "../types";
import SRSearchBar from "./SRSearchBar";
import { useTranslation } from "react-i18next";

type GroupDisplayState = {
  deleted: boolean;
};

type GroupDisplayProps = {
  title: string;
  initialSearch: Function;
  getObjectsHTML: Function;
  objectType: string;
  objectTypePlural: string;
  addUrl: string;
  search: (searchString: string, allObjects: Object[]) => Promise<Object[]>;
  searchImmediately: boolean;
  useImageView: boolean;
  setUseImageView: (shouldUse: boolean) => void;
  children?: JSX.Element;
};

const GroupDisplay: React.FC<GroupDisplayProps> = ({
  title,
  initialSearch,
  getObjectsHTML,
  objectType,
  objectTypePlural,
  addUrl,
  search,
  searchImmediately,
  useImageView,
  setUseImageView,
  children,
}: GroupDisplayProps): ReactElement => {
  const { user } = useContext<ContextType>(Context);
  const [searchString, setSearchString] = useState("");
  const [matchingObjects, setMatchingObjects] = useState<Array<Object>>([]);
  const [allObjects, setAllObjects] = useState([]);
  const [firstRender, setFirstRender] = useState(true);
  const [numObjects, setNumObjects] = useState(0);
  const [objectStyleIcon, setObjectStyleIcon] = useState(
    <FontAwesomeIcon icon={solid("image")} />
  );
  const [unusedIcon, setUnusedIcon] = useState(
    <FontAwesomeIcon icon={solid("list")} />
  );
  const { t } = useTranslation();

  const location = useLocation();
  const state = location.state as GroupDisplayState;

  useEffect(() => {
    if (state?.deleted) {
      toast.success(
        t("Deleted placeholder", { placeholder: state.deleted }),
        toastEmitter({})
      );
      state.deleted = false;
    }
    if (firstRender) {
      setFirstRender(false);
      initialSearch(setAllObjects, setSearchString);
    }
  }, [firstRender, state, setAllObjects, initialSearch, setSearchString]);

  useEffect(() => {
    setMatchingObjects(allObjects);
  }, [allObjects]);

  useEffect(() => {
    setNumObjects(matchingObjects.length);
  }, [matchingObjects]);

  const onSearchChange = async (e) => {
    setSearchString(e.target.value || "");
    if (searchImmediately) doSearch(e.target.value);
  };

  const onSearchClick = searchImmediately
    ? undefined
    : async () => doSearch(searchString);

  const doSearch = async (searchValue: string): Promise<void> => {
    setMatchingObjects(await search(searchValue, allObjects));
  };

  const changeView = () => {
    const temp = objectStyleIcon;
    setObjectStyleIcon(unusedIcon);
    setUnusedIcon(temp);
    setUseImageView(!useImageView);
  };

  return (
    <SRFlex direction="column">
      <SRContainer padding="none" maxWidth="xlarge">
        <SRFlex direction="column" padding="large">
          <SRHeader size="large" underlined>
            {title}
          </SRHeader>
          <SRSearchBar
            searchString={searchString}
            placeholder={t("Search placeholder", {
              placeholder: objectTypePlural.toLocaleLowerCase(),
            })}
            onSearchChange={onSearchChange}
            onSearchClick={onSearchClick}
          />
          <SRFlex margin="large" width="xlarge">
            <SRButtonLink to={addUrl} size="small" disabled={!user}>
              +
            </SRButtonLink>
            <SRText>
              {`${numObjects} ${
                numObjects === 1 ? objectType : objectTypePlural
              }`}
            </SRText>
            <SRButton onClick={changeView} size="small">
              {objectStyleIcon}
            </SRButton>
          </SRFlex>
        </SRFlex>
        <SRFlex wrap="wrap" justifyContent="space-around" alignItems="stretch">
          {getObjectsHTML(matchingObjects)}
        </SRFlex>
        {children}
      </SRContainer>
    </SRFlex>
  );
};

export default GroupDisplay;
