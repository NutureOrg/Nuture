import React, { useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Adress = () => {
  const navigation = useNavigation();

  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [addressName, setAddressName] = useState("");
  const [complement, setComplement] = useState("");

  const signIn = () => {
    navigation.navigate("SignIn");
  };

  const handleSubmit = () => {
    if (
      !zipCode ||
      !country ||
      !state ||
      !city ||
      !neighborhood ||
      !number ||
      !addressName
    ) {
      alert("Preencha todos os campos");
      return;
    }

    const address = {
      zip_code: zipCode,
      country,
      state,
      city,
      neighborhood,
      number,
      address_name: addressName,
      complement,
    };

    navigation.navigate("DescDist", {
      address,
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
          <Input placeholder="CEP" value={zipCode} onChangeText={setZipCode} />
          <Input placeholder="País" value={country} onChangeText={setCountry} />
          <Input placeholder="Estado" value={state} onChangeText={setState} />
          <Input placeholder="Cidade" value={city} onChangeText={setCity} />
          <Input
            placeholder="Bairro"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
          <Input placeholder="Número" value={number} onChangeText={setNumber} />
          <Input
            placeholder="Logradouro"
            value={addressName}
            onChangeText={setAddressName}
          />
          <Input
            placeholder="Complemento"
            value={complement}
            onChangeText={setComplement}
          />
          <Button onPress={handleSubmit}>Registrar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Adress;
