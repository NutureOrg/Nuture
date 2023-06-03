import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Link from "../../../components/link/Link";

const SignIn = () => {
  const route = useRoute();
  const userType = route.params?.userType || "";

  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const signIn = () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    const loginData = {
      username: email.trim(),
      password: password.trim(),
    };

    fetch("http://192.168.1.108:8080/nuture/users/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Ocorreu um erro ao fazer login.");
        }
      })
      .then((data) => {
        console.log(data);
        navigation.navigate("Profile");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde.");
      });
      console.log(loginData)
  };

  const signUpClient = () => {
    navigation.navigate("SignUp");
  };

  const signUpDistributor = () => {
    navigation.navigate("SignUpDist");
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Preencha as informações para entrar na sua conta" />
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
          {userType === "client" && (
            <Link onPress={signUpClient}>Criar conta como cliente</Link>
          )}
          {userType === "distributor" && (
            <Link onPress={signUpDistributor}>
              Criar conta como centro de distribuição
            </Link>
          )}
        </Kav>
      </Background>
    </Container>
  );
};

export default SignIn;
