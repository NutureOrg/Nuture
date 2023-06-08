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

  const formatCpf = (value) => {
    const cpfRegex = /^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/;
    const match = value.replace(/\D/g, "").match(cpfRegex);
    const formattedCpf = !match
      ? ""
      : match
          .slice(1)
          .filter((group) => group !== "")
          .join(".");
    setCpf(formattedCpf);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    if (!validateEmail(email)) {
      alert("Email inválido");
      return;
    }

    const cleanedCpf = cpf.replace(/\D/g, "");

    navigation.navigate("PhoneClient", {
      name,
      email,
      cpf: cleanedCpf,
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
            type="cpf"
            value={cpf}
            onChangeText={formatCpf}
            keyboardType="numeric"
          />
          <Input
            placeholder="Nova senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Input
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          <Button onPress={handleSubmit}>Registrar</Button>
          <Link onPress={signIn} style={{ marginTop: 10 }}>
            Já tem uma conta? Entrar
          </Link>
        </Kav>
      </Background>
    </Container>
  );
};

export default SignUp;
