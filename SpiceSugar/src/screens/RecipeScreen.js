import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const RecipeScreen = ({ route }) => {
    const { cocktailId } = route.params;
    const [cocktail, setCocktail] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        fetchCocktailDetails();
        checkIsLiked();
    }, [isFocused]);

    const fetchCocktailDetails = async () => {
        try {
            const response = await fetch(
                `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`,
            );
            const data = await response.json();
            setCocktail(data.drinks[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const checkIsLiked = async () => {
        try {
            const likedCocktails = await AsyncStorage.getItem('likedCocktails');
            if (likedCocktails) {
                const parsedCocktails = JSON.parse(likedCocktails);
                setIsLiked(parsedCocktails.includes(cocktailId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const toggleLike = async () => {
        try {
            let likedCocktails = await AsyncStorage.getItem('likedCocktails');
            let parsedCocktails = [];

            if (likedCocktails) {
                parsedCocktails = JSON.parse(likedCocktails);
            }

            if (isLiked) {
                parsedCocktails = parsedCocktails.filter((id) => id !== cocktailId);
            } else {
                parsedCocktails.push(cocktailId);
            }

            await AsyncStorage.setItem('likedCocktails', JSON.stringify(parsedCocktails));
            setIsLiked(!isLiked);
        } catch (error) {
            console.error(error);
        }
    };

    const renderIngredients = () => {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient) {
                ingredients.push(
                    <Text key={i} style={styles.ingredient}>
                        {ingredient} {measure}
                    </Text>,
                );
            }
        }

        return ingredients;
    };

    return (
        <ScrollView style={styles.container}>
            {cocktail ? (
                <>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{cocktail.strDrink}</Text>
                        <TouchableOpacity onPress={toggleLike} style={styles.likeButton}>
                            {isLiked ? (
                                <FontAwesome name="heart" size={24} color="red" />
                            ) : (
                                <FontAwesome name="heart-o" size={24} color="#333" />
                            )}
                        </TouchableOpacity>
                    </View>

                    <Image
                        style={styles.image}
                        source={{ uri: cocktail.strDrinkThumb }}
                        resizeMode="cover"
                    />
                    <Text style={styles.subtitle}>Ingredients:</Text>
                    {renderIngredients()}
                    <Text style={styles.subtitle}>Instructions:</Text>
                    <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
                </>
            ) : (
                <Text style={styles.loading}>Loading...</Text>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
        textAlign: 'left',
    },
    likeButton: {
        flex: 1,
        textAlign: 'right',
    },
    image: {
        width: 150,
        height: 150,
        marginLeft: 10,
        borderRadius: 10,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 5,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    ingredient: {
        fontSize: 16,
        marginBottom: 5,
        color: '#666',
    },
    instructions: {
        fontSize: 16,
        lineHeight: 24,
        color: '#666',
    },
    loading: {
        fontSize: 18,
        color: '#333',
        alignSelf: 'center',
        marginTop: 100,
    },
});
export default RecipeScreen;
