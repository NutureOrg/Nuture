import React from "react";
import { Btn, BtnText } from "./styles";

const Button = (props) => {
  const { style, children, onPress } = props;

  return (
    <Btn onPress={onPress} style={style}>
      <BtnText>{children}</BtnText>
    </Btn>
  );
};
export default Button;
 