import React, { useState } from "react";
import { Container, Background } from "./styles";
import axios from "axios";

import Title from "../../../components/title/Title";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Recipe = () => {
  const [ingredients, setIngredients] = useState("");

  const handleIngredientChange = (value) => {
    setIngredients(value);
  };

  const fetchRecipe = async () => {
    try {
      const client = axios.create({
        headers: { Authorization: `Bearer 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` }
      })
      const params = {
        messages: [{"role": "user", "content": `Generate a JSON of a recipe table for a person with a height of 1.75m and weight of 60kg, with the attributes "listFood" (a list of ingredients), "methodPreparation" (a string with a detailed description of the recipe preparation), "recipeDescription", and "category".

        ${ingredients}
        
        Generate a recipe that will maximize the amount of food possible while providing the highest satiety, and make it clear in the attribute. All attributes must be well-detailed text strings.
        
        Create a cool recipe with a user-friendly preparation method, including the following details:
        - Quantities in grams
        - Meal times
        - Clearly state that the recipe will meet the person's needs.
        
        Use this JSON example:
        
        {
          "listFood": [
            {
              "food": "rice",
              "quantity": "200g",
              "category": "Grains"
            },
            {
              "food": "eggs",
              "quantity": "3 units",
              "category": "Food"
            },
            {
              "food": "chicken",
              "quantity": "300g",
              "category": "Meat"
            }
          ],
          "description": "Preparation Method:\n\n1. In a saucepan, add water and bring it to a boil.\n2. Add the rice and cook for about 15 minutes or until tender. Drain and set aside.\n3. In another saucepan, bring water to a boil.\n4. Carefully add the eggs and cook for approximately 8 minutes to obtain soft-boiled eggs.\n5. Remove the eggs from the hot water and place them in cold water for a few minutes. Peel the eggs and cut them in half.\n6. In a frying pan, heat some oil and grill the chicken seasoned to your taste until golden brown and fully cooked.\n7. Serve the cooked rice with the eggs cut in half and the grilled chicken. Season with salt and pepper to taste, if desired.\n\nThis dish is nutritious and provides a feeling of satiety due to the combination of chicken protein, rice carbohydrates, and healthy fats from the eggs. It is ideal for lunch.\n\nRemember that if you don't have any of the mentioned foods, you can seek donations at shelters or charity organizations available in the app.\n\nThis recipe is suitable for a person with a height of 1.75m and weight of 60kg. It offers a balanced and nutritious meal that can meet the daily nutrient requirements. The quantity of ingredients used has been calculated to generate a generous amount of food and provide a lasting feeling of satiety.\n\nThe dish consists of cooked rice, boiled eggs, and grilled chicken. Rice provides energy through carbohydrates, eggs are an excellent source of protein, and chicken contributes with more protein and essential nutrients. This combination results in a balanced and tasty meal.\n\nIt is recommended to consume this recipe for lunch to obtain nutritional benefits and the necessary satiety throughout the day.\n\nIf you don't have any of the mentioned foods, you can seek donations at shelters or charity organizations available in the app."
        }
        
        Now, let's do the attribute mapping:
        
        listaIngredientes -> listFood
        ingrediente -> food
        quantidade -> quantity
        categoria -> category
        modoDePreparo -> methodPreparation
        descricaoReceira -> recipeDescription
        
        Finally, merge the methodPreparation and recipeDescription into a single string with the attribute name "description".`}],
        model: "gpt-3.5-turbo",
        max_tokens: 1000,
        temperature: 0.7
      };
  
      const response = client.post(
        "https://api.openai.com/v1/chat/completions",
        params
      ).then((result) => console.log(result))
      .catch((err) => console.log(err));;
  
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <Container>
      <Background source={require("../../../assets/BackgroundImage.jpg")}>
        <Title text="Liste os alimentos disponíveis para a criação da receita" />
        <Input
          onChangeText={handleIngredientChange}
          value={ingredients}
          multiline={false}
          numberOfLines={20}
          style={{ height: 50 }}
        ></Input>
        <Button onPress={fetchRecipe}>Consultar Receitas</Button>
      </Background>
    </Container>
  );
};

export default Recipe;
