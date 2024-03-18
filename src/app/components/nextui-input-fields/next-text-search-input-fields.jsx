import { Input } from "@nextui-org/react";
import React from "react";

const NextTextSearchInputField = ({ label, placeholder, value, onChange }) => {
  return (
    <Input
      isClearable
      type="text"
      label={label}
      variant="bordered"
      placeholder={placeholder}
      onClear={() => console.log("input cleared")}
      className="max-w-xs"
    />
  );
};

export default NextTextSearchInputField;
