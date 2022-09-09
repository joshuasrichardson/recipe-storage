import React, { useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
// @ts-ignore
import SRBoxView from "../../sr-ui/SRBoxView.tsx";
// @ts-ignore
import SRListView from "../../sr-ui/SRListView.tsx";
// @ts-ignore
import SRGroupDisplay from "../../sr-ui/SRGroupDisplay.tsx";
import {
  darkTextColor,
  expiringSoonColor,
  themeRed,
  themeGreen, // @ts-ignore
} from "../../sr-ui/styles.ts";
import moment, { Moment } from "moment";
// @ts-ignore
import { formatDate } from "../../utils/dateUtils.ts";
import { Item } from "../../types";

type ItemGroupProps = {
  title: string;
  getItemGroup: Function;
  itemViewDir: string;
  showExpiration: boolean;
  itemType: string;
  itemTypePlural: string;
};

const ItemGroup: React.FC<ItemGroupProps> = ({
  title,
  getItemGroup,
  itemViewDir,
  showExpiration,
  itemType = "Item",
  itemTypePlural = "Items",
}: ItemGroupProps): ReactElement => {
  const [useImageView, setUseImageView] = useState(false);

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
        { key: "Container", value: item.container },
        {
          key: showExpiration
            ? "Expiration"
            : item.deleted
            ? "Deleted"
            : "Added",
          value: showExpiration
            ? formatDate(item.expiration)
            : formatDate(item.added),
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
        : (item.deleted ? "Deleted " : "Added ") + item.name;

    const getDateColor = (expiration: Moment): string => {
      if (!showExpiration || !expiration || typeof expiration === "string")
        return darkTextColor;
      const today = moment();
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
      getAllObjects={getItemGroup}
      getObjectsHTML={getItemsHTML}
      objectType={itemType}
      objectTypePlural={itemTypePlural}
      addUrl="/storage/add"
      search={search}
      useImageView={useImageView}
      setUseImageView={setUseImageView}
    />
  );
};

export default ItemGroup;
