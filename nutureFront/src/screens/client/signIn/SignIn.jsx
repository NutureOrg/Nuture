import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const SignIn = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const goToSignInClientScreen = () => {
    navigation.navigate("");
  };

  const goToPhoneAgeClientScreen = () => {
    if (!name || !email || !cpf || !password || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    navigation.navigate("", {
      name,
      email,
      cpf,
      password,
    });
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Preencha as informações para criar sua nova conta" />
          <Input
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="E-mail válido"
            value={email}
            onChangeText={setEmail}
          />
          <Input placeholder="CPF válido" value={cpf} onChangeText={setCpf} />
          <Input
            placeholder="Nova senha"
            value={password}
            onChangeText={setPassword}
          />
          <Input
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Button>Registrar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default SignIn;
