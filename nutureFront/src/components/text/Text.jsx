import React from "react";
import { Container, TitleText } from "./styles";

const Text = (props) => {
  const { style, children } = props;

  return (
    <Container>
      <TitleText style={style}>{children}</TitleText>
    </Container>
  );
};

export default Text;
