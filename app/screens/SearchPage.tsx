import React, { useState } from 'react';
import {  View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Icon, Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

const SearchMovies = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch movies from API
    const fetchMovies = async (query) => {
        const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=us&title=${encodeURIComponent(query)}&series_granularity=show&show_type=movie&output_language=en`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '5f16ed5ffemshe4550dacca20074p1a0450jsnfe1557d7577b',
                'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
            },
        };

        try {
            setLoading(true);
            const response = await fetch(url, options);
            const result = await response.json(); // Parse the response
            console.log(response)
            setSearchResults(result.results || []); // Save results
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle search action
    const handleSearch = () => {
        if (searchQuery.trim() !== '') {
            fetchMovies(searchQuery);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search for movies..."
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onSubmitEditing={handleSearch} // Search on 'Enter'
                />
                <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
                    <Icon name="search" type="feather" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Loading Indicator */}
            {loading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

            {/* Results */}
            <ScrollView style={styles.resultsContainer}>
                {searchResults.map((data, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.detailCard}
                        onPress={() => navigation.navigate('FilmDetails', { data })}
                    >
                        <Avatar
                            avatarStyle={{ borderRadius: 5 }}
                            containerStyle={{ height: 120, width: 80 }}
                            source={{ uri: data.imageSet?.verticalPoster?.w240 || 'https://via.placeholder.com/80x120' }}
                        />
                        <View style={styles.cardContent}>
                            <Text style={styles.movieTitle}>{data.originalTitle}</Text>
                            <View style={styles.ratingRow}>
                                <Icon name="star" color="#FFC319" size={15} type="antdesign" />
                                <Text style={styles.ratingText}>{data.rating?.toString().split('').join('.')}/10 IMDb</Text>
                            </View>
                            <View style={styles.genreRow}>
                                {data.genres?.map((genre, idx) => (
                                    <Button
                                        key={idx}
                                        title={genre.name}
                                        buttonStyle={styles.pillStyle}
                                        titleStyle={styles.pillText}
                                        type="outline"
                                    />
                                ))}
                            </View>
                            <Text style={styles.movieType}>{data.showType}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    searchButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    resultsContainer: {
        flex: 1,
        padding: 10,
    },
    detailCard: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    ratingText: {
        marginLeft: 5,
    },
    genreRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5,
    },
    pillStyle: {
        borderColor: '#007BFF',
        borderWidth: 1,
        borderRadius: 20,
        marginRight: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    pillText: {
        fontSize: 12,
        color: '#007BFF',
    },
    movieType: {
        marginTop: 5,
        fontSize: 14,
        color: '#666',
    },
});

export default SearchMovies;
