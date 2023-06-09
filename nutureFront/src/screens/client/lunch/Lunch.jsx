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
      id,
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
      fullyToken
    } = route.params;

    navigation.navigate("Diet", {
      id,
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
      fullyToken
    });
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title>
            Liste os alimentos que geralmente estão disponíveis na sua casa para
            o almoço
          </Title>
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
