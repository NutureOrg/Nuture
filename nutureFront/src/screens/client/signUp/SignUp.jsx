import { React, useState, useEffect } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signIn = () => {
    navigation.navigate("SignIn");
  };

  const handleCpfChange = (value) => {
    setCpf(value);
  };

  const handleSubmit = () => {
    if (!name || !email || !cpf || !password || !confirmPassword) {
      alert("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }

    navigation.navigate("PhoneClient", {
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
          <Title>Preencha as informações para criar sua nova conta</Title>
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
          <Input
            placeholder="CPF válido"
            value={cpf}
            onChangeText={handleCpfChange}
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

export default SignUp;
