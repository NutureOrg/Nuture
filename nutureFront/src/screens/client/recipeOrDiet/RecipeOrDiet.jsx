import React from "react";
import { Container, Background } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const RecipeOrDiet = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const isDiet = () => {
    const { name, email, cpf, password, phone, birthday, sex, height, weight } =
      route.params;

    navigation.navigate("Gender", {
      name,
      email,
      cpf,
      password,
      phone,
      birthday,
      sex,
      height,
      weight,
    });
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Title>Crie um programa alimentar inicial</Title>
        <Button onPress={isDiet}>Programa alimentar</Button>
      </Background>
    </Container>
  );
};

export default RecipeOrDiet;
