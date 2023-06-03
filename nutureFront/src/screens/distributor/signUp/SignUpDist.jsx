import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const SignUpDist = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signIn = () => {
    navigation.navigate("SignIn");
  };

  const handleSubmit = () => {
    if (!name || !email || !cnpj || !password || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    navigation.navigate("DescDist", {
      name,
      email,
      cnpj,
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
            placeholder="Nome do Centro de Distribuição"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="E-mail válido"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            placeholder="Cnpj válido"
            value={cnpj}
            onChangeText={setCnpj}
          />
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
          <Button onPress={handleSubmit}>Registrar</Button>
          <Link onPress={signIn}>Já tem uma conta? Entrar</Link>
        </Kav>
      </Background>
    </Container>
  );
};

export default SignUpDist;
