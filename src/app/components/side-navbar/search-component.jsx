import { Input } from "@nextui-org/react";
import React from "react";

const MapSearchInputField = ({ label, placeholder, list, value, onChange }) => {
  return (
    <Input
      list={list}
      isClearable
      type="text"
      size={"sm"}
      label={label}
      placeholder={placeholder}
      onClear={() => console.log("input cleared")}
      className="w-full  rounded-lg"
    />
  );
};

export default MapSearchInputField;
