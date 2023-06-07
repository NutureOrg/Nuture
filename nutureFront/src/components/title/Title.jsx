import React from "react";
import { Container, TitleText } from "./styles";

const Title = (props) => {
  const { style, children, key } = props;

  return (
    <Container>
      <TitleText style={style} key={key}>{children}</TitleText>
    </Container>
  );
};

export default Title;
