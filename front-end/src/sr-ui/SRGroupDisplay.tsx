import React, { useContext, useState, useEffect, ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { toast } from "react-toastify";
// @ts-ignore
import { toastEmitter } from "./Toaster.tsx";
// @ts-ignore
import SRButton from "./SRButton.tsx";
// @ts-ignore
import SRButtonLink from "./SRButtonLink.tsx";
// @ts-ignore
import SRFlex from "./SRFlex.tsx";
// @ts-ignore
import SRContainer from "./SRContainer.tsx";
// @ts-ignore
import SRHeader from "./SRHeader.tsx";
// @ts-ignore
import SRText from "./SRText.tsx";
// @ts-ignore
import SRTextInput from "./SRTextInput.tsx";
// @ts-ignore
import { Context } from "../App.tsx";
// @ts-ignore
import { ContextType } from "../types.ts";

type GroupDisplayState = {
  deleted: boolean;
};

type GroupDisplayProps = {
  title: string;
  initialSearch: Function;
  singleViewUrl: string;
  getObjectsHTML: Function;
  objectType: string;
  objectTypePlural: string;
  addUrl: string;
  search: (searchString: string, allObjects: Object[]) => Promise<Object[]>;
  useImageView: boolean;
  setUseImageView: (shouldUse: boolean) => boolean;
};

const GroupDisplay: React.FC<GroupDisplayProps> = ({
  title,
  initialSearch,
  getObjectsHTML,
  objectType,
  objectTypePlural,
  addUrl,
  search,
  useImageView,
  setUseImageView,
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
  const [searchIcon, setSearchIcon] = useState(
    <FontAwesomeIcon icon={solid("search")} />
  );
  const [unusedIcon, setUnusedIcon] = useState(
    <FontAwesomeIcon icon={solid("list")} />
  );

  const location = useLocation();
  const state = location.state as GroupDisplayState;

  useEffect(() => {
    if (state?.deleted) {
      toast.success("Deleted " + state.deleted + "!", toastEmitter);
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
    setSearchString(e.target?.value?.trim() || "");
  };

  const onSearchClick = async (e) => {
    doSearch(searchString);
  };

  const doSearch = async (searchValue: string): Promise<void> => {
    setMatchingObjects(await search(searchValue, allObjects));
  };

  const changeView = () => {
    let temp = objectStyleIcon;
    setObjectStyleIcon(unusedIcon);
    setSearchIcon(searchIcon);
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
          <SRFlex direction="row" alignItems="flex-end" justifyContent="center">
            <SRTextInput
              id="object-search-bar"
              type="search"
              value={searchString}
              placeholder={
                "Search " + objectTypePlural.toLocaleLowerCase() + "..."
              }
              onChange={onSearchChange}
              fillBackground
            />
            <SRButton onClick={onSearchClick} size="small" >
                {searchIcon}
            </SRButton>
          </SRFlex>
          <SRFlex margin="large" width="xlarge">
            <SRButtonLink to={addUrl} size="small" disabled={!user}>
              +
            </SRButtonLink>
            <SRText>
              {numObjects} {numObjects === 1 ? objectType : objectTypePlural}
            </SRText>
            <SRButton onClick={changeView} size="small">
              {objectStyleIcon}
            </SRButton>
          </SRFlex>
        </SRFlex>
        <SRFlex wrap="wrap" justifyContent="space-around" alignItems="stretch">
          {getObjectsHTML(matchingObjects)}
        </SRFlex>
      </SRContainer>
    </SRFlex>
  );
};

export default GroupDisplay;
