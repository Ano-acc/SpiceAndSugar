import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetchCocktails();
    }, []);

    const fetchCocktails = async () => {
        try {
            const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
            let allCocktails = [];

            for (const letter of alphabet) {
                const response = await fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`,
                );
                const data = await response.json();
                if (data.drinks) {
                    allCocktails = allCocktails.concat(data.drinks);
                }
            }

            setCocktails(allCocktails);
        } catch (error) {
            console.error(error);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.cocktailContainer}
            onPress={() => navigation.navigate('Recipe', { cocktailId: item.idDrink })}>
            <View style={styles.cocktailDetailsContainer}>
                <Text style={styles.cocktailTitle}>{item.strDrink}</Text>
            </View>
            <Image
                style={styles.cocktailImage}
                source={{ uri: item.strDrinkThumb }}
                resizeMode="cover"
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cocktails}
                renderItem={renderItem}
                keyExtractor={(item) => item.idDrink}
                contentContainerStyle={styles.listContentContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F8F8F8',
    },
    listContentContainer: {
        paddingBottom: 20,
    },
    cocktailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    cocktailDetailsContainer: {
        flex: 1,
    },
    cocktailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    cocktailImage: {
        width: 100,
        height: 100,
        marginLeft: 10,
        borderRadius: 10,
    },
});

export default HomeScreen;
