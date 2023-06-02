import React from "react";
import { Container, TitleText } from "./styles";

const Title = (props) => {
  const { style, text } = props;

  return (
    <Container>
      <TitleText style={style}>{text}</TitleText>
    </Container>
  );
};

export default Title;
