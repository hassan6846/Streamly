import { View, StyleSheet, ScrollView, ActivityIndicator, Alert, RefreshControl, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
// UI
import { Text, Button, Icon, Avatar } from '@rneui/themed';
import ImageBlurShadow from 'react-native-image-blur-shadow';
//utils
import Colors from '../util/Color';
import { SafeAreaView } from 'react-native-safe-area-context';


const HomePage = ({ navigation }: { navigation }) => {
    const [loading, setLoading] = useState(true);
    const [filmData, setFilmData] = useState<any>([]);
    const [scrolldata, setscrolldata] = useState<any>([]);
    const FetchData = async () => {
        // First request URL (for regular films)
        const url1 = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie';

        // Second request URL (for top-rated films)
        const url2 = 'https://streaming-availability.p.rapidapi.com/shows/search/filters?country=us&series_granularity=show&order_direction=asc&order_by=original_title&genres_relation=and&output_language=en&show_type=movie&rating_min=80';

        try {
            // Making two requests simultaneously using Promise.all
            const [response1, response2] = await Promise.all([
                fetch(url1, {
                    method: "GET",
                    headers: {
                        'x-rapidapi-key': '5f16ed5ffemshe4550dacca20074p1a0450jsnfe1557d7577b',
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
                    },
                }),
                fetch(url2, {
                    method: "GET",
                    headers: {
                        'x-rapidapi-key': '5f16ed5ffemshe4550dacca20074p1a0450jsnfe1557d7577b',
                        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
                    },
                }),
            ]);

            // Check if both responses are OK
            if (response1.ok && response2.ok) {
                const data1 = await response1.json();
                const data2 = await response2.json();

                setFilmData(data1.shows);
                setscrolldata(data2.shows);

                console.log('Film Data:', data1.shows);
                console.log('Top Rated Data:', data2.shows);
            } else {
                console.error('Error fetching data:', response1.statusText, response2.statusText);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            Alert.alert("Error while connecting to the server");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        FetchData();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:"#fff"}}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={FetchData}
                    />
                }

                style={styles.HomeContainer}>
                {/* Now Showing Section */}
                <View style={styles.HomeHead}>
                    <Text h4 h4Style={{ fontSize: 16 }}>Now Showing</Text>
                    <Button
                        title="See more"
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        type="outline"
                    />
                </View>
                <ScrollView
                    style={{ height: 380 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        // Check if scrolldata is an array and not empty

                        scrolldata.map((data, index) => (
                            <TouchableOpacity onPress={() => navigation.navigate("FilmDetails", { data: data })} style={{ marginLeft: 5 }} key={index}>
                                <ImageBlurShadow
                                    style={styles.ImageStyles}
                                    source={{ uri: data.imageSet.verticalPoster.w240 }}
                                    imageWidth={200}
                                    imageBorderRadius={5}
                                    imageHeight={300}
                                    shadowOffset={30}
                                    shadowBlurRadius={12}
                                />
                                <Text style={styles.filmtitle}>{data.originalTitle}</Text>
                                <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}>
                                    <Icon name='star' color="#FFC319" size={15} type='antdesign' />
                                    <Text style={{ color: Colors.Light.FontSubHeading }}>  {data.rating.toString().split('').join('.')}/10 IMDb</Text>
                                </View>
                            </TouchableOpacity>
                        ))

                    }
                </ScrollView>

                {/* Latest 2024 Section */}
                <View style={styles.HomeHead}>
                    <Text h4 h4Style={{ fontSize: 16 }}>Latest 2024</Text>
                    <Button
                        title="See more"
                        buttonStyle={styles.buttonStyle}
                        titleStyle={styles.titleStyle}
                        type="outline"
                    />
                </View>

                {/* Check if filmData is an array and not empty */}
                <View style={styles.detailContainer}>

                    {
                        filmData.map((data, index) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("FilmDetails", { data: data })}
                                key={index} style={styles.DetailCard}>
                                <Avatar
                                    avatarStyle={{ borderRadius: 5 }}
                                    containerStyle={{ height: 120, width: 80 }}
                                    source={{ uri: data.imageSet.verticalPoster.w240 }}
                                />
                                <View style={{ flexDirection: "column", justifyContent: "space-between", paddingVertical: 2, rowGap: 5 }}>
                                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>{data.originalTitle}</Text>
                                    <View style={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}>
                                        <Icon name='star' color="#FFC319" size={15} type='antdesign' />
                                        <Text> {data.rating.toString().split('').join('.')}/10 IMDb</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", columnGap: 10 }}>
                                        {data.genres && data.genres.map((genre, idx) => (
                                            <Button
                                                key={idx}
                                                title={genre.name}
                                                buttonStyle={styles.PillStyle}
                                                titleStyle={styles.pillText}
                                                type="outline"
                                            />
                                        ))}
                                    </View>
                                    <View style={{ flexDirection: "row", columnGap: 10, alignItems: "center" }}>
                                        <Text>{data.showType}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    HomeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    HomeHead: {
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    buttonStyle: {
        backgroundColor: 'transparent',
        borderColor: '#E5E4EA',
        borderRadius: 20,
    },
    PillStyle: {
        backgroundColor: '#DBE3FF',
        borderColor: '#E5E4EA',
        borderRadius: 20,
    },
    titleStyle: {
        fontSize: 10,
        color: '#AAA9B1',

    },
    pillText: {
        fontWeight: "600",
        fontSize: 12,
        color: '#88A4E8',

    },
    ImageStyles: {
        marginBottom: -20,
    },
    filmtitle: {
        fontSize: 14,

        color: "#110E47",
        fontWeight: "bold",
    },
    DetailCard: {
        flexDirection: 'row',
        columnGap: 10,
    },
    detailContainer: {
        padding: 20,
        rowGap: 20,
    }
});

export default HomePage;
