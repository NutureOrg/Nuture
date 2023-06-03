import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// client area
import UserChoise from "../screens/UserChoise";
import SignUp from "../screens/client/signUp/SignUp";
import SignIn from "../screens/client/signIn/SignIn";
import PhoneClient from "../screens/client/signUp/PhoneClient";
import Gender from "../screens/client/signUp/Gender";
import RecipeOrDiet from "../screens/client/recipeOrDiet/RecipeOrDiet";
import Frequency from "../screens/client/signUp/Frequency";

// distributor area
import SignUpDist from "../screens/distributor/signUp/SignUpDist";
import DescDist from "../screens/distributor/signUp/DescDist";
import Address from "../screens/distributor/signUp/Address";
import Operation from "../screens/distributor/signUp/Operation";
import PhoneDist from "../screens/distributor/signUp/PhoneDist";

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        {/* Client area */}

        <Stack.Screen
          name="UserChoise"
          component={UserChoise}
          options={{ headerShown: false }}
        />
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

        {/* Distributor area */}

        <Stack.Screen
          name="SignUpDist"
          component={SignUpDist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DescDist"
          component={DescDist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Operation"
          component={Operation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PhoneDist"
          component={PhoneDist}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
