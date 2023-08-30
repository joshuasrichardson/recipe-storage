import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, {
  ChangeEventHandler,
  MouseEventHandler,
  ReactElement,
} from "react";
import SRButton from "./SRButton";
import SRFlex from "./SRFlex";
import SRTextInput from "./SRTextInput";

type SRSearchBarProps = {
  searchString: string;
  placeholder: string;
  onSearchChange: ChangeEventHandler<Element>;
  onSearchClick: MouseEventHandler<HTMLButtonElement>;
};

const SRSearchBar: React.FC<SRSearchBarProps> = (
  props: SRSearchBarProps
): ReactElement => {
  return (
    <SRFlex direction="row" alignItems="flex-end" justifyContent="center">
      <SRTextInput
        id="object-search-bar"
        type="search"
        value={props.searchString}
        placeholder={props.placeholder}
        onChange={props.onSearchChange}
        fillBackground
      />
      {props.onSearchClick && (
        <SRButton onClick={props.onSearchClick} size="small">
          <FontAwesomeIcon icon={solid("search")} />
        </SRButton>
      )}
    </SRFlex>
  );
};

export default SRSearchBar;
