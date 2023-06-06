import React, { useState } from "react";
import { Container, Background } from "./styles";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  const { id, height, weight, fullyToken } = route.params;

  const handleIngredientChange = (value) => {
    setIngredients(value);
  };

  const goToRecipeScreen = () => {
    navigation.navigate("Recipe", {
      ingredients,
      id,
      height,
      weight,
      fullyToken
    })
  }
  

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Title>Liste os alimentos disponíveis para a criação da receita</Title>
        <Input
          onChangeText={handleIngredientChange}
          value={ingredients}
          multiline={false}
          numberOfLines={20}
          style={{ height: 50 }}
        ></Input>
        <Button onPress={goToRecipeScreen}>Consultar Receitas</Button>
      </Background>
    </Container>
  );
};

export default Ingredients;
