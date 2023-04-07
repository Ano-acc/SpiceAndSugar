import React from 'react';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import LikedCocktailsScreen from './src/screens/LikedCocktailsScreen';
import { FontAwesome } from '@expo/vector-icons';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Cocktails' }} />
      <Stack.Screen name="Recipe" component={RecipeScreen} options={{ title: 'Cocktail Recipe', }} />
    </Stack.Navigator>
  );
};

const FavStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home" >
      <Stack.Screen name="fav" component={LikedCocktailsScreen} options={{ title: 'Liked Cocktails', }} />
      <Stack.Screen name="Recipe" component={RecipeScreen} options={{ title: 'Cocktail Recipe', }} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'HomeStack') {
              iconName = 'home';
            } else if (route.name === 'LikedCocktails') {
              iconName = 'heart';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Home' }} />
        <Tab.Screen name="LikedCocktails" component={FavStack} options={{ title: '', }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
