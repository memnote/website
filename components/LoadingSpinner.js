import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-full flex justify-center mt-8">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
