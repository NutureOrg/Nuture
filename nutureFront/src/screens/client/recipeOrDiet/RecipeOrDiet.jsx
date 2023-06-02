import React from "react";
import { Container, Background } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const RecipeOrDiet = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isRecipe = () => {
    navigation.navigate("");
  };

  const isDiet = () => {
    const { name, email, cpf, password, phone, birthday } = route.params;

    navigation.navigate("Gender", {
      name,
      email,
      cpf,
      password,
      phone,
      birthday
    });
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
