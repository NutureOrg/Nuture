import React from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation } from "@react-navigation/native";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const BreakFast = () => {
  const navigation = useNavigation();
  const [alimentos, setAlimentos] = useState("");

  const handleFrequency = (value) => {
    setFood_frequency(value);
  };

  const goToLunchScreen = () => {
    navigation.navigate("");
  };

  return (
    <Container>
      <Background source={require("../../../assets/backgroundImage.svg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <Title text="Liste os alimentos que geralmente estão disponíveis na sua casa para o almoço" />
          <Input
            placeholder="Ex: Arroz, ovo e tomate"
            multiline={true}
            numberOfLines={25}
            style={{
              height: 150,
              paddingTop: 10,
            }}
          />
          <Button onPress={goToLunchScreen}>Concluir</Button>
        </Kav>
      </Background>
    </Container>
  );
};

export default BreakFast;
