import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const RecipeScreen = ({ route }) => {
    const { cocktailId } = route.params;
    const [cocktail, setCocktail] = useState(null);

    useEffect(() => {
        fetchCocktailDetails();
    }, []);

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

    const renderIngredients = () => {
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
            const ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];

            if (ingredient) {
                ingredients.push(
                    <Text key={i}>
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
                    <Text style={styles.title}>{cocktail.strDrink}</Text>
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
    title: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
        color: '#333',
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
