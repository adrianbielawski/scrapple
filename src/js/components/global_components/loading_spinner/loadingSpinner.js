import React from "react";
import styles from "./loadingSpinner.scss";

const LoadingSpinner = (props) => (
  <div
    className={`${styles.loader} ${!props.background && styles.noBackground}`}
    style={{ height: `${props.size}px`, width: `${props.size}px` }}
  >
    Loading...
  </div>
);

export default LoadingSpinner;
