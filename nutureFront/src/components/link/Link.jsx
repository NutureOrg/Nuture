import React from "react";
import { LinkButton, LinkText } from "./styles";

const Link = (props) => {
  const { onPress, children } = props;

  return (
    <LinkButton onPress={onPress}>
      <LinkText>{children}</LinkText>
    </LinkButton>
  );
};

export default Link;
