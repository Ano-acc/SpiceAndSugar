import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cocktails' }} />
        <Stack.Screen name="Recipe" component={RecipeScreen} options={{ title: 'Cocktail Recipe' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
