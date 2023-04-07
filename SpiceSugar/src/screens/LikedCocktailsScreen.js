import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const LikedCocktailsScreen = ({ navigation }) => {
    const [likedCocktails, setLikedCocktails] = useState([]);
    const [cocktails, setCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const isFocused = useIsFocused();


    useEffect(() => {
        fetchLikedCocktails();
    }, [isFocused]);


    const fetchLikedCocktails = async () => {
        try {
            const likedCocktails = await AsyncStorage.getItem('likedCocktails');
            if (likedCocktails) {
                setLikedCocktails(JSON.parse(likedCocktails));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false); // set loading status to false when fetch is complete
        }
    };

    useEffect(() => {
        if (likedCocktails.length > 0) {
            fetchData();
        } else {
            setCocktails([]);
        }
    }, [likedCocktails]); // fetch data when likedCocktails state changes


    const fetchData = async () => {
        let results = [];
        for (const id of likedCocktails) {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
            const data = await response.json();
            results.push(data.drinks[0]);
        }
        setCocktails(results);
    }

    const renderItem = ({ item }) => {
        return (
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
        )
    };

    if (isLoading) {
        return <Text>Loading...</Text>; // render loading message while data is being fetched
    }

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

export default LikedCocktailsScreen;
