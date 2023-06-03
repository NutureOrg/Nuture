import React, { useState } from "react";
import { Container, Background, InputContainer, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Address = () => {
  const navigation = useNavigation();
  const route = useRoute();

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

  const handleZipCodeChange = async (value) => {
    setZipCode(value);

    if (value.length === 8) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${value}/json/`
        );

        const { data } = response;

        if (data.erro) {
          alert("CEP inválido");
          clearAddressFields();
        } else {
          setCountry("Brasil");
          setState(data.uf);
          setCity(data.localidade);
          setNeighborhood(data.bairro);
          setAddressName(data.logradouro);
        }
      } catch (error) {
        console.log(error);
        clearAddressFields();
        alert("Erro ao consultar o CEP");
      }
    } else {
      clearAddressFields();
    }
  };

  const clearAddressFields = () => {
    setCountry("");
    setState("");
    setCity("");
    setNeighborhood("");
    setAddressName("");
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

    const { name, email, cnpj, password, description } = route.params;

    navigation.navigate("Operation", {
      name,
      email,
      cnpj,
      password,
      description,
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
          <Title text="Preencha as informações para criar sua nova conta" style={{marginTop: 100,}}/>
          <Input
            placeholder="CEP"
            value={zipCode}
            onChangeText={handleZipCodeChange}
          />
          <Input placeholder="País" value={country} onChangeText={setCountry} />
          <InputContainer>
            <Input
              placeholder="Cidade"
              value={city}
              onChangeText={setCity}
              style={{ width: 145 }}
            />
            <Input
              placeholder="Estado"
              value={state}
              onChangeText={setState}
              style={{ width: 145 }}
            />
          </InputContainer>
          <Input
            placeholder="Bairro"
            value={neighborhood}
            onChangeText={setNeighborhood}
          />
          <InputContainer>
            <Input
              placeholder="Logradouro"
              value={addressName}
              onChangeText={setAddressName}
              style={{ width: 190 }}
            />
            <Input
              placeholder="Número"
              value={number}
              onChangeText={setNumber}
              style={{ width: 100 }}
            />
          </InputContainer>
          <Input
            placeholder="Complemento"
            value={complement}
            onChangeText={setComplement}
          />
          <Button onPress={handleSubmit}>Continuar</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default Address;
