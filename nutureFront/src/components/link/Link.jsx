import React from "react";
import { LinkButton, LinkText } from "./styles";

const Link = (props) => {
  const { onPress, children, style } = props;

  return (
    <LinkButton onPress={onPress} style={style}>
      <LinkText>{children}</LinkText>
    </LinkButton>
  );
};

export default Link;
