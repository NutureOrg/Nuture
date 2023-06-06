import React, { useState, useEffect } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const signIn = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    const loginData = {
      username: email.trim(),
      password: password.trim(),
    };

    console.log(loginData)

    try {
      const response = await fetch(
        `http://192.168.1.119:8080/nuture/users/login`,
        {
          method: "POST",
          body: JSON.stringify(loginData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        console.log("Usuário logado");
        console.log(data);

        navigation.navigate("Profile", {
          email,
          token
        });
      } else {
        throw new Error("Ocorreu um erro ao fazer login.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Verifique email e senha e tente novamente mais tarde.");
    }
  };

  const signUpClient = () => {
    navigation.navigate("SignUp");
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title>Preencha as informações para entrar na sua conta</Title>
          <Input
            placeholder="E-mail"
            value={email}
            onChangeText={handleEmailChange}
          />
          <Input
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          <Button onPress={signIn}>Entrar</Button>
          <Link onPress={signUpClient}>Criar conta</Link>
        </Kav>
      </Background>
    </Container>
  );
};

export default SignIn;
