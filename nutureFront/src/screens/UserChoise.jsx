import React from "react";
import { Container, Background } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../components/title/Title";
import Button from "../components/button/Button";

const UserChoice = () => {
  const navigation = useNavigation();

  const handleUserTypeSelection = (userType) => {
    navigation.navigate("SignIn", { userType });
  };

  return (
    <Container>
      <Background source={require("../assets/BackgroundImage.jpg")}>
        <Title text="Como deseja utilizar nosso app?" />
        <Button onPress={() => handleUserTypeSelection("client")}>
          Sou Cliente
        </Button>
        <Button onPress={() => handleUserTypeSelection("distributor")}>
          Centro de Distribuição
        </Button>
      </Background>
    </Container>
  );
};

export default UserChoice;
