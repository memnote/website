import React from "react";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({
  onClick,
  color,
  background,
  text,
  href,
  target,
  style,
  children,
}) {
  const click = (e) => {
    if (onClick) onClick();
    if (href) window.open(href, target ? target : "self");
  };

  const appliedStyles = style
    ? { color, background, ...style }
    : { color, background };

  return (
    <button className={styles.button} onClick={click} style={appliedStyles}>
      {text ? text : children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  background: PropTypes.string,
  text: PropTypes.string,
  href: PropTypes.string,
  target: PropTypes.string,
  style: PropTypes.object,
};

export default Button;
