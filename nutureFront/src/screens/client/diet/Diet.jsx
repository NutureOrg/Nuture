import { React, useState } from "react";
import { Container, Background, Kav } from "./styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Diet = () => {
  const route = useRoute();
  const[loading, setLoading] = useState(true)

  //TODO: Tela de Loading com Carregamento

  if (loading) {
    //Mostrar loading na tela
  }

  let diet = {}

    const { name, email, cpf, password, phone, birthday, sex, height, weight, breakfast, food_frequency, lunch } =
      route.params;

    const fourMealsPrompt = `generate a JSON for a diet table for a person with a height of ${height}cm and weight of ${weight}kg, with attributes breakfast, lunch, afternoon coffee, and dinner. In each attribute, include the meal times.

    The diet should be designed for a duration only.
    
    Given that this person can only consume the following foods for breakfast and afternoon coffee: (${breakfast})
    
    Given that this person can only consume the following foods for lunch and dinner: (${lunch})
    
    Using only these attributes:
    
    breakfast:
    lunch:
    afternoon coffee:
    dinner:
    
    All attributes must be well-detailed text strings and include:
    
    Quantities in grams
    Meal times
    Clearly state that the meal will meet the person's needs.
    Use this JSON example:
    
    {
    "breakfast": "For breakfast, you can have a meal around 8:00 AM consisting of 2 scrambled eggs with bread and flour.",
    "lunch": "For lunch, you can have a satisfying meal with 1 ladle of beans, 2 servings of rice, and 2 pieces of meat.",
    "afternoon coffee": "For afternoon coffee, you can have a lighter meal of 2 scrambled eggs and bread.",
    "dinner": "For dinner, you can have a filling meal with 1 and a half ladles of beans and 2 servings of rice.",
    "description": "<Always make it clear at the end of the messages that if the user doesn't have any of the foods, they can go to the donation centers>"
    }
    at the end translate every string except the attributes.`

    const threeMealsPrompt = `generate a JSON for a diet table for a person with a height of ${height}cm and weight of ${weight}kg, with attributes breakfast, lunch, and dinner. In each attribute, include the meal times.

    The diet should be designed for a duration only.
    
    Given that this person can only consume the following foods for breakfast: (${breakfast})
    
    Given that this person can only consume the following foods for lunch and dinner: (${lunch})
    
    Using only these attributes:
    
    breakfast:
    lunch:
    dinner:
    
    All attributes must be well-detailed text strings and include:
    
    Quantities in grams
    Meal times
    Clearly state that the meal will meet the person's needs.
    Use this JSON example:
    
    {
    "breakfast": "For breakfast, you can have a meal around 8:00 AM consisting of 2 scrambled eggs with bread and flour.",
    "lunch": "For lunch, you can have a satisfying meal with 1 ladle of beans, 2 servings of rice, and 2 pieces of meat.",*
    "dinner": "For dinner, you can have a filling meal with 1 and a half ladles of beans and 2 servings of rice.",
    "description": "<Always make it clear at the end of the messages that if the user doesn't have any of the foods, they can go to the donation centers>"
    }
    at the end translate every string except the attributes.`

    var finalPrompt = "" 
    if(food_frequency === "THREE_MEALS") {
      finalPrompt = threeMealsPrompt 
    } else finalPrompt = fourMealsPrompt
     

    try {
      const client = axios.create({
        headers: { Authorization: `Bearer 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` }
      })

      console.log(finalPrompt)
      const params = {
        messages: [{"role": "user", "content": finalPrompt}],
        model: "gpt-3.5-turbo",
        max_tokens: 1000,
        temperature: 0.7
      };

      console.log(params)
  
      const response = client.post(
        "https://api.openai.com/v1/chat/completions",
        params
      ).then((result) => {
        //TODO: Mapear esse objetivo para mostrar na tela
        //setLoading(false)
        diet = result.data.choices[0].message.content
        console.log(diet)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        alert("Ocorreu um erro, tentar novamente mais tarde.")
      }) 
      ;;
        
      console.log(response)
    } catch (error) {
      // Trate os erros, caso ocorram.
      console.log(error);
    }

    try {

      console.log(name);
      console.log(cpf);
      console.log(email);
      console.log(weight);
      console.log(height);
      console.log(birthday);
      console.log(sex);
      console.log(food_frequency);
      console.log(password);
      console.log(phone);

      if (response.ok) {
        alert("Programa alimentar criado com sucesso");
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Kav
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
        </Kav>
      </Background>
    </Container>
  );
};

export default Diet;
