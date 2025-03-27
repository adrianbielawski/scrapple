import React from "react";
import * as styles from "./card.scss";

const Card = (props, ref) => {
  return (
    <div className={`${styles.card} ${props.className || ""}`} ref={ref}>
      {props.children}
    </div>
  );
};

export default React.forwardRef(Card);

