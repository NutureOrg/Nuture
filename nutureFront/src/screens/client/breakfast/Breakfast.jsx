import { React, useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Breakfast = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [breakfast, setBreakfast] = useState("");

  const handleBreakfast = (value) => {
    setBreakfast(value);
  };

  const goToLunchScreen = () => {
    if (!breakfast) {
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
      food_frequency,
      fullyToken
    } = route.params;

    navigation.navigate("Lunch", {
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
            o café da manhã
          </Title>
          <Input
            value={breakfast}
            onChangeText={handleBreakfast}
            placeholder="Ex: Ovos, Pão, Leite"
            multiline={false}
            numberOfLines={25}
            style={{
              height: 50,
              paddingTop: 10,
            }}
          />
          <Button onPress={goToLunchScreen}>Concluir</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Breakfast;
