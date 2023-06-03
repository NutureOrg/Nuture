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

  const formatCnpj = (cnpjValue) => {
    // Remove qualquer caractere que não seja um número
    const numericCnpj = cnpjValue.replace(/\D/g, "");

    // Aplica a máscara de CNPJ (##.###.###/####-##)
    const maskedCnpj = numericCnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/,
      "$1.$2.$3/$4-$5"
    );

    return maskedCnpj;
  };

  const handleCnpjChange = (cnpjValue) => {
    const formattedCnpj = formatCnpj(cnpjValue);
    setCnpj(formattedCnpj);
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
            placeholder="CNPJ válido"
            value={cnpj}
            onChangeText={handleCnpjChange}
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
