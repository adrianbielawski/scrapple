import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import * as styles from "./placeholder.scss";

const cx = classNames.bind(styles);

const Placeholder = (props) => {
  const placeholderClass = cx("placeholder", {
    rightAnimation: props.rightAnimation,
  });

  return (
    <li
      className={placeholderClass}
      style={{ height: `${props.height}px` }}
    ></li>
  );
};

Placeholder.propTypes = {
  height: PropTypes.number,
};

export default Placeholder;

