import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// client area
import SignUp from "../screens/client/signUp/SignUp";
import SignIn from "../screens/client/signIn/SignIn";
import PhoneClient from "../screens/client/signUp/PhoneClient";
import Gender from "../screens/client/signUp/Gender";
import RecipeOrDiet from "../screens/client/recipeOrDiet/RecipeOrDiet";
import Frequency from "../screens/client/signUp/Frequency";
import Recipe from "../screens/client/recipe/Recipe";
import Lunch from "../screens/client/lunch/Lunch";
import Breakfast from "../screens/client/breakfast/Breakfast"

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* Client area */}
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneClient"
          component={PhoneClient}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gender"
          component={Gender}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeOrDiet"
          component={RecipeOrDiet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Frequency"
          component={Frequency}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Recipe"
          component={Recipe}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Breakfast"
          component={Breakfast}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Lunch"
          component={Lunch}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
