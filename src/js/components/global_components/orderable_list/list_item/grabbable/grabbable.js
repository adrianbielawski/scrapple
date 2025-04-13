import React, { useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ItemContext from "../itemContext";
import { ListContext } from "../../listStore";

const SCROLL_STEP = 1;

const Grabbable = (props) => {
  const itemContext = useContext(ItemContext);
  const { state: listContext, dispatch, onDrop } = useContext(ListContext);
  const grabbableElementRef = useRef(null);
  const scrollInterval = useRef(null);

  const { grabbedElement } = listContext;

  const doScroll = () => {
    if (
      listContext.scrollStep > 0 &&
      window.innerHeight + window.pageYOffset >= document.body.clientHeight
    ) {
      return;
    }
    if (listContext.scrollStep < 0 && window.pageYOffset <= 0) {
      return;
    }

    window.scrollBy({
      top: listContext.scrollStep,
      left: 0,
    });
  };

  const handleGrab = (e) => {
    e.preventDefault();
    if (e.buttons === 2) {
      return;
    }

    if (listContext.items.length === 1) {
      return;
    }
    if (e.type === "touchstart" && e.touches.length > 1) {
      return;
    }

    let elRect = itemContext.element.current.getBoundingClientRect();
    const startCoords = { top: elRect.y, left: elRect.x };
    const elementW = elRect.width;
    const elementH = elRect.height;

    let startGrabCoords = { x: e.clientX, y: e.clientY };
    if (e.type === "touchstart") {
      startGrabCoords = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }

    dispatch({
      type: "ELEMENT_GRABBED",
      index: itemContext.index,
      elementW,
      elementH,
      startCoords,
      startGrabCoords,
    });
  };

  const move = (e) => {
    let x, y;

    if (e.type === "touchmove") {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else if (e.buttons > 0) {
      x = e.clientX;
      y = e.clientY;
    } else {
      // no button pressed and it's not a touch event
      return;
    }

    let scrollStep = null;
    if (y >= window.innerHeight - grabbedElement.height * 0.8) {
      scrollStep = SCROLL_STEP;
    } else if (y <= grabbedElement.height * 0.8) {
      scrollStep = -SCROLL_STEP;
    }

    const top =
      y - grabbedElement.startGrabCoords.y + grabbedElement.startCoords.top;
    const left =
      x - grabbedElement.startGrabCoords.x + grabbedElement.startCoords.left;

    let distance =
      (top +
        window.pageYOffset -
        listContext.initialTopOffset -
        grabbedElement.startCoords.top) /
      grabbedElement.height;

    distance = Math.round(distance);
    if (distance === -0) {
      distance = 0;
    }

    dispatch({
      type: "ELEMENT_MOVED",
      coords: { top, left },
      distance,
      scrollStep,
    });
  };

  const handleDrop = (e) => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }

    if (listContext.items.length === 1) {
      return;
    }

    if (e.type === "touchend" && e.touches.length > 0) {
      return;
    }

    let newPosition = grabbedElement.index + listContext.distance;
    if (newPosition < 1) {
      newPosition = 0;
    } else if (newPosition >= listContext.items.length) {
      newPosition = listContext.items.length - 1;
    }

    onDrop(newPosition);
  };

  const handleOnMouseLeave = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
    dispatch({ type: "MOUSE_LEFT" });
  };

  useEffect(() => {
    const currentElement = grabbableElementRef.current;

    if (currentElement === null) {
      return;
    }

    currentElement.addEventListener("touchstart", handleGrab, {
      passive: false,
    });
    currentElement.addEventListener("mousedown", handleGrab);

    if (grabbedElement.index === itemContext.index) {
      currentElement.addEventListener("touchend", handleDrop);
      currentElement.addEventListener("mouseup", handleDrop);
      document.body.addEventListener("mouseleave", handleOnMouseLeave);
    }

    return () => {
      currentElement.removeEventListener("touchstart", handleGrab, {
        passive: false,
      });
      currentElement.removeEventListener("touchend", handleDrop);
      currentElement.removeEventListener("mousedown", handleGrab);
      currentElement.removeEventListener("mouseup", handleDrop);
      document.body.removeEventListener("mouseleave", handleOnMouseLeave);
    };
  }, [
    listContext.distance,
    grabbedElement,
    listContext.items,
    itemContext.index,
  ]);

  useEffect(() => {
    if (grabbedElement.index === null) {
      return;
    }

    if (listContext.isTouchDevice) {
      window.addEventListener("touchmove", move);
    } else {
      window.addEventListener("mousemove", move);
    }

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
    };
  }, [grabbedElement.index]);

  useEffect(() => {
    if (listContext.scrollStep === null) {
      return;
    }

    scrollInterval.current = setInterval(doScroll, 20);

    return () => {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    };
  }, [listContext.scrollStep]);

  return (
    <div {...props} ref={grabbableElementRef}>
      {props.children}
    </div>
  );
};

Grabbable.propTypes = {
  className: PropTypes.string,
};

export default Grabbable;

