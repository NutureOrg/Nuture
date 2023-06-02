import React from "react";
import { Container, Background } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const RecipeOrDiet = () => {
  const navigation = useNavigation();

  const isRecipe = () => {
    navigation.navigate("");
  };

  const isDiet = () => {
    navigation.navigate("Gender");
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Title text="Você deseja consultar receitas ou montar um programa alimentar?" />
        <Button>Consultar Receitas</Button>
        <Button onPress={isDiet}>Programa alimentar</Button>
      </Background>
    </Container>
  );
};

export default RecipeOrDiet;
