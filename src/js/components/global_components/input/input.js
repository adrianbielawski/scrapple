import React from "react";
import "./input.scss";

const Input = (props, ref) => <input {...props} ref={ref} spellCheck="false" />;

export default React.forwardRef(Input);

