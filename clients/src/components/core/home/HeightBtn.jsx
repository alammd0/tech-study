import React from "react";

const HeightBtn = ({ text, textColor, Bgcolor, BorderColor }) => {
  return (
    <button
      className={`${textColor} ${Bgcolor} border-2 ${BorderColor} rounded-md px-4 py-2 hover:scale-105 transition-all duration-200`}
    >
      {text}
    </button>
  );
};

export default HeightBtn;
