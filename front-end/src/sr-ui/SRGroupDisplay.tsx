import React, { useState, useEffect, ReactElement } from "react";
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

type GroupDisplayState = {
  deleted: boolean;
};

type GroupDisplayProps = {
  title: string;
  getAllObjects: Function;
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
  getAllObjects,
  getObjectsHTML,
  objectType,
  objectTypePlural,
  addUrl,
  search,
  useImageView,
  setUseImageView,
}: GroupDisplayProps): ReactElement => {
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

  const location = useLocation();
  const state = location.state as GroupDisplayState;

  useEffect(() => {
    if (state?.deleted) {
      toast.success("Deleted " + state.deleted + "!", toastEmitter);
      state.deleted = false;
    }
    if (firstRender) {
      setFirstRender(false);
      getAllObjects(setAllObjects);
    }
  }, [firstRender, state, allObjects, setAllObjects, getAllObjects]);

  useEffect(() => {
    setMatchingObjects(allObjects);
  }, [allObjects]);

  useEffect(() => {
    setNumObjects(matchingObjects.length);
  }, [matchingObjects]);

  const onSearchChange = async (e) => {
    const searchValue = e.target?.value?.trim() || "";
    setSearchString(e.target?.value || "");
    doSearch(searchValue);
  };

  const doSearch = async (searchValue: string): Promise<void> => {
    setMatchingObjects(await search(searchValue, allObjects));
  };

  const changeView = () => {
    let temp = objectStyleIcon;
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
          <SRTextInput
            id="object-search-bar"
            type="search"
            value={searchString}
            placeholder={
              "Search " + objectTypePlural.toLocaleLowerCase() + "..."
            }
            onChange={onSearchChange}
          ></SRTextInput>
          <SRFlex margin="large" width="xlarge">
            <SRButtonLink to={addUrl} size="small">
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
