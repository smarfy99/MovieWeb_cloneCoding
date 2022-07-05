import React from "react";
import propTypes from "prop-types";

const Button = ({ text }) => {
  return <div>{text}</div>;
};

Button.propTypes = {
  text: propTypes.string.isRequired,
};

export default Button;
