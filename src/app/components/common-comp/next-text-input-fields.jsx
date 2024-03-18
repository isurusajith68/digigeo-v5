import { Input } from "@nextui-org/react";
import React from "react";

const NextTextInputField = ({
  label,
  value,
  onChange,
  color = "default",
  variant = "flat",
  className = "",
}) => {
  return (
    <Input
      type="text"
      variant={variant}
      label={label}
      size="sm"
      placeholder="Type here..."
      value={value}
      onChange={onChange}
      color={color}
      className={className}
    />
  );
};

export default NextTextInputField;
