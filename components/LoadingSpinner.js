import React from "react";

const LoadingSpinner = ({ size = 80 }) => {
  const style = { width: `${size}px`, height: `${size}px` };
  const innerStyle = { width: `${size - 16}px`, height: `${size - 16}px` };

  return (
    <div className="lds-ring" style={style}>
      <div style={innerStyle}></div>
      <div style={innerStyle}></div>
      <div style={innerStyle}></div>
      <div style={innerStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
