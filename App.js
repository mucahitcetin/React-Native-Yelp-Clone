import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchScreen from "./screens/SearchScreen";
import ResultsShowScreen from "./screens/ResultsShowScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitle: "Yelp-Clone" }}>
        <Stack.Screen
          name="Home"
          component={SearchScreen}
          options={{ title: "Home Screen" }}
        />
         <Stack.Screen
          name="ResultsShow"
          component={ResultsShowScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
