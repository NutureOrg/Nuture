import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";

const DescDist = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = () => {
    if (!description) {
      alert("Adicione uma descrição");
      return;
    }

    const { name, email, cnpj, password } = route.params;

    navigation.navigate("Adress", {
      name,
      email,
      cnpj,
      password,
      description,
    });
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          <Title text="Adicione uma breve descrição sobre o seu Centro de Distribuição" />
          <Input
            placeholder="Descrição"
            value={description}
            onChangeText={handleDescriptionChange}
            multiline={true}
            numberOfLines={20}
            style={{
              paddingTop: 10,
              height: 140,
            }}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default DescDist;
