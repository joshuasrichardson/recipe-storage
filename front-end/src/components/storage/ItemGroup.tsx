import React, { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import SRBoxView from "../../sr-ui/SRBoxView";
import SRListView from "../../sr-ui/SRListView";
import SRGroupDisplay from "../../sr-ui/SRGroupDisplay";
import {
  darkTextColor,
  expiringSoonColor,
  themeRed,
  themeGreen,
} from "../../sr-ui/styles";
import Utils, { srDate } from "../../utils/utils";
import { SRDate, Item } from "../../types";
import { useTranslation } from "react-i18next";

type ItemGroupProps = {
  title: string;
  getItemGroup: Function;
  itemViewDir: string;
  showExpiration: boolean;
  itemType: string;
  itemTypePlural: string;
  dateFormatter?: (date: SRDate) => string;
  children?: JSX.Element;
};

const ItemGroup: React.FC<ItemGroupProps> = ({
  title,
  getItemGroup,
  itemViewDir,
  showExpiration,
  itemType,
  itemTypePlural,
  dateFormatter = Utils.formatDate,
  children,
}: ItemGroupProps): ReactElement => {
  const [useImageView, setUseImageView] = useState(false);
  const { t } = useTranslation();

  const getItemsHTML = (items) => {
    if (useImageView) {
      return items.map((item) => (
        <ImgViewItem
          key={item._id}
          item={item}
          itemViewDir={itemViewDir}
          showExpiration={showExpiration}
        />
      ));
    }
    return items.map((item) => (
      <ListViewItem
        key={item._id}
        item={item}
        itemViewDir={itemViewDir}
        showExpiration={showExpiration}
      />
    ));
  };

  const search = async (
    searchValue: string,
    allItems: Array<any>
  ): Promise<Array<any>> => {
    if (!searchValue) {
      return allItems;
    }

    const searchItems = [];
    for (let item of allItems) {
      try {
        if (item.name?.toLowerCase().includes(searchValue.toLowerCase())) {
          searchItems.push(item);
          continue;
        }

        if (item.brand?.toLowerCase().includes(searchValue.toLowerCase())) {
          searchItems.push(item);
          continue;
        }
        if (item.container?.toLowerCase().includes(searchValue.toLowerCase())) {
          searchItems.push(item);
          continue;
        }
        if (
          typeof item.tags === "string" &&
          item.tags?.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          searchItems.push(item);
          continue;
        }
      } catch (err) {
        console.log(err);
      }
    }

    return searchItems;
  };

  type ItemViewParams = {
    item: Item;
    itemViewDir: string;
    showExpiration: boolean;
  };

  const ImgViewItem = ({
    item,
    itemViewDir,
    showExpiration,
  }: ItemViewParams) => {
    const getItemAttributes = () => {
      return [
        { key: t("Container"), value: item.container },
        {
          key: showExpiration
            ? t("Expiration")
            : item.deleted
            ? t("Deleted")
            : t("Added"),
          value: showExpiration
            ? dateFormatter(item.expiration)
            : dateFormatter(item.added),
        },
      ];
    };

    const navigate = useNavigate();
    return (
      <SRBoxView
        onClick={() => {
          navigate(itemViewDir + item._id);
        }}
        key={item?._id}
        src={item?.src}
        label={item?.name}
        attributes={getItemAttributes()}
      />
    );
  };

  const ListViewItem = ({
    item,
    itemViewDir,
    showExpiration,
  }: ItemViewParams) => {
    const navigate = useNavigate();

    const getName = () =>
      showExpiration
        ? item.name
        : t(item.deleted ? "Deleted placeholder" : "Added placeholder", {
            placeholder: item.name,
          });

    const getDateColor = (expiration: SRDate): string => {
      if (!showExpiration || !expiration || typeof expiration === "string")
        return darkTextColor;
      const today = srDate();
      if (expiration.isBefore(today)) return themeRed;
      if (expiration.isBefore(today.add(1, "week"))) return expiringSoonColor;

      return darkTextColor;
    };

    return (
      <SRListView
        key={item._id}
        name={getName()}
        nameColor={!showExpiration && item.deleted ? themeRed : themeGreen}
        info={item.container}
        date={showExpiration ? item.expiration : item.added}
        dateFormatter={dateFormatter}
        dateColor={getDateColor(item.expiration)}
        onClick={() => {
          navigate(itemViewDir + item._id);
        }}
      />
    );
  };

  return (
    <SRGroupDisplay
      title={title}
      initialSearch={(setAllItems) => getItemGroup(setAllItems)}
      getObjectsHTML={getItemsHTML}
      objectType={itemType}
      objectTypePlural={itemTypePlural}
      addUrl="/storage/add"
      search={search}
      searchImmediately={true}
      useImageView={useImageView}
      setUseImageView={setUseImageView}
    >
      {children}
    </SRGroupDisplay>
  );
};

export default ItemGroup;
