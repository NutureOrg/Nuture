import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInputMask } from "react-native-masked-text";

import Title from "../../../components/title/Title";
import Button from "../../../components/button/Button";

const PhoneClient = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
  };

  const handleBirthdayChange = (value) => {
    setBirthday(value);
  };

  const formatDateToISO = (dateStr) => {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    const phoneParts = phoneNumber.trim().split("-");
    const ddi = phoneParts[0];
    const ddd = phoneParts[1];
    const phoneNumberValue = phoneParts[2];

    if (!ddi || !ddd || !phoneNumber || !birthday) {
      alert("Preencha todos os campos");
      return;
    }

    const phone = {
      ddi: ddi.trim(),
      ddd: ddd.trim(),
      phone_number: phoneNumberValue.trim(),
    };

    const { name, email, cpf, password } = route.params;
    const formattedBirthday = formatDateToISO(birthday);

    navigation.navigate("RecipeOrDiet", {
      name,
      email,
      cpf,
      password,
      phone,
      birthday: formattedBirthday,
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
              marginBottom: "15%",
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
          <Title text="Qual é sua data de nascimento?" />
          <TextInputMask
            style={{
              width: 307,
              height: 55,
              marginTop: "5%",
              paddingLeft: 10,
              borderRadius: 10,
              backgroundColor: "#fff",
            }}
            placeholder="Ex: 02/03/2004"
            type={"datetime"}
            options={{
              format: "DD-MM-YYYY",
            }}
            value={birthday}
            onChangeText={handleBirthdayChange}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default PhoneClient;
