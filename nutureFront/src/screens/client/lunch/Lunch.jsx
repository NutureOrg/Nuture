import { React, useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Lunch = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [lunch, setLunch] = useState("");

  const handlelunch = (value) => {
    setLunch(value);
  };

  const handleSubmit = () => {
    if (!lunch) {
      alert("Preencha o campo.");
      return;
    }

    const {
      name,
      email,
      cpf,
      password,
      phone,
      birthday,
      sex,
      height,
      weight,
      breakfast,
      food_frequency,
    } = route.params;

    navigation.navigate("Diet", {
      name,
      email,
      cpf,
      password,
      phone,
      birthday,
      sex,
      height,
      weight,
      breakfast,
      food_frequency,
      lunch,
    });
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Liste os alimentos que geralmente estão disponíveis na sua casa para o almoço: " />
          <Input
            placeholder="Ex: Arroz, ovo e tomate"
            value={lunch}
            onChangeText={handlelunch}
            multiline={false}
            numberOfLines={25}
            style={{
              height: 50,
              paddingTop: 10,
            }}
          />
          <Button onPress={handleSubmit}>Concluir</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Lunch;
