import React from "react";
import { Container, Background } from "./styles";

import Title from "../../../components/title/Title";
import Input from '../../../components/input/Input'
import Button from "../../../components/button/Button";

const Recipe = () => {


  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Title text="Liste os alimentos disponíveis para a criação da receita" />
        <Input multiline={true} numberOfLines={20} style={{height: 150}}></Input>
        <Button>Consultar Receitas</Button>
      </Background>
    </Container>
  );
};

export default Recipe;
