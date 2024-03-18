// components/Accordion.js
import React from "react";

const Accordion = ({ children }) => {
  return (
    <div className="flex flex-col gap-1 w-full pb-2 pl-2 pr-2 pt-2 ">
      {children}
    </div>
  );
};

export default Accordion;
