import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const PhoneDist = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleSubmit = () => {
    const phoneParts = phoneNumber.trim().split("-");
    const ddi = phoneParts[0];
    const ddd = phoneParts[1];
    const phoneNumberValue = phoneParts[2];

    if (!ddi || !ddd || !phoneNumberValue) {
      alert("Preencha todos os campos");
      return;
    }

    const phone = {
      ddi: ddi.trim(),
      ddd: ddd.trim(),
      phone_number: phoneNumberValue.trim(),
    };

    const { name, email, cnpj, password, description, address, opening_hours } =
      route.params;

    console.log(name);
    console.log(description);
    console.log(cnpj);
    console.log(email);
    console.log(opening_hours);
    console.log(address);
    console.log(phone);

    fetch("http://192.168.1.108:8080/nuture/distcenters", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        cnpj,
        password,
        description,
        address,
        opening_hours,
        phone,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('centro criado com sucesso');
        navigation.navigate("PhoneDist");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Ocorreu um erro ao registrar. Tente novamente mais tarde.");
      });
  };

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Informe um número de telefone válido" />
          <TextInputMask
            style={{
              width: 307,
              height: 55,
              marginTop: "5%",
              paddingLeft: 10,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            placeholder="Ex: +55 (11)933986562"
            type={"custom"}
            options={{
              mask: "+99-99-999999999",
            }}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default PhoneDist;
