import React from "react";
import { Container, TitleText } from "./styles";

const Title = (props) => {
  const { style, children } = props;

  return (
    <Container>
      <TitleText style={style}>{children}</TitleText>
    </Container>
  );
};

export default Title;
