import React from "react";
import { InputText } from "./styles";

const Input = (props) => {
  const {
    type,
    placeholder,
    value,
    multiline,
    numberOfLines,
    style,
    onChangeText,
    secureTextEntry,
  } = props;

  return (
    <InputText
      type={type}
      placeholder={placeholder}
      multiline={multiline}
      numberOfLines={numberOfLines}
      style={style}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default Input;
