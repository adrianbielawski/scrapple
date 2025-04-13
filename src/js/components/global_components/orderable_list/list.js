import React, { useEffect, useContext } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import styles from "./orderableList.scss";
//Custom Components
import ListItem from "./list_item/listItem";
import Placeholder from "./placeholder/placeholder";
//Contexts
import { ListContext } from "./listStore";

const List = (props) => {
  const { state, dispatch } = useContext(ListContext);

  const inspectDeviceScreen = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };

  const getPlaceholder = () => {
    if (state.grabbedElement.index === null) {
      return null;
    }
    let placeholder = state.grabbedElement.index + state.distance;

    if (placeholder >= state.grabbedElement.index) {
      placeholder += 1;
    }
    if (placeholder >= props.items.length) {
      placeholder = props.items.length;
    }
    if (placeholder <= 0) {
      placeholder = 0;
    }

    return placeholder;
  };

  const getListItems = () => {
    const ItemComponent = props.itemComponent;
    const placeholder = getPlaceholder();

    const listItems = props.items.map((item, index) => {
      let transform = placeholder <= index;
      if (
        state.grabbedElement.index === null ||
        state.grabbedElement.index === index
      ) {
        transform = false;
      }

      return (
        <ListItem
          key={`${index}/${props.items.length}`}
          className={props.itemClassName}
          grabbedClassName={props.grabbedItemClassName}
          rightAnimation={props.rightAnimation}
          transition={state.transition}
          transform={transform}
          item={item}
          index={index}
        >
          <ItemComponent item={item} index={index} />
        </ListItem>
      );
    });

    if (state.grabbedElement.index !== null) {
      listItems.push(
        <Placeholder
          key={"placeholder"}
          height={state.grabbedElement.height}
        />,
      );
    }

    return listItems;
  };

  useEffect(() => {
    dispatch({
      type: "DEVICE_INSPECTED",
      isTouchDevice: inspectDeviceScreen(),
    });
  }, []);

  useEffect(() => {
    if (state.grabbedElement.index !== null) {
      window.document.body.style.overscrollBehavior = "contain";
    }

    return () => {
      window.document.body.style.overscrollBehavior = "unset";
    };
  }, [state.grabbedElement.index]);

  useEffect(() => {
    if (state.grabbedElement.index !== null) {
      window.requestAnimationFrame(() =>
        dispatch({ type: "ENABLE_TRANSITION" }),
      );
    }
  }, [state.grabbedElement.index]);

  const listClass = classNames(styles.list, props.className);

  return <ul className={listClass}>{getListItems()}</ul>;
};

List.propTypes = {
  className: PropTypes.string,
  itemClassName: PropTypes.string,
  grabbedItemClassName: PropTypes.string,
  rightAnimation: PropTypes.bool,
  items: PropTypes.array.isRequired,
  itemComponent: PropTypes.elementType.isRequired,
};

export default List;
