import React from "react";
import "./button.scss";

const Button = (props) => <button {...props}>{props.children}</button>;

export default Button;
