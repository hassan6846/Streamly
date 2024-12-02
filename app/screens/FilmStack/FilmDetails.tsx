import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
//ui
import { Avatar } from "@rneui/themed";
import { SafeAreaView } from "react-native-safe-area-context";

//state
import { useRoute } from "@react-navigation/native";
import { Text, Icon } from "@rneui/themed";
import IconPlay from "react-native-vector-icons/AntDesign"
const FilmDetails = ({ navigation }: { navigation: any }) => {
    const route = useRoute<any>();
    const { data } = route.params;

    useEffect(() => {
        console.log(data);
    });

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
                {/* Poster */}
                <View style={{ position: "relative" }}>


                    <Avatar

                        containerStyle={{ width: "100%", height: 250 }}
                        avatarStyle={{ borderRadius: 10 }}
                        source={{ uri: data.imageSet.horizontalPoster.w1080 }}
                    />
                    <IconPlay

                        onPress={() =>
                            navigation.navigate("WatchVideo", {
                                id: data.imdbId,
                            })
                        }
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: [{ translateX: -25 }, { translateY: -25 }]
                        }}

                        color="#fff" size={50} name="playcircleo" />
                </View>
                {/* Title */}
                <View>
                    <Icon size={50} name="play" style={{ position: "absolute" }} type="antdesign" />

                    <Text style={{ marginTop: 10, marginBottom: 10 }} h3>
                        {data.title}
                    </Text>
                </View>

                {/* Genres (Row of Pills) */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ marginBottom: 10 }}
                >
                    <View style={{ flexDirection: "row" }}>
                        {data.genres.map((genre: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.genrePill}
                            >
                                <Text style={styles.genreText}>{genre.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.detailsContainer}>
                    {/* Length */}
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Length</Text>
                        <Text style={styles.detailValue}>n/a</Text>
                    </View>

                    {/* Language */}
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Language</Text>
                        <Text style={styles.detailValue}>English</Text>
                    </View>

                    {/* Rating */}
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Rating</Text>
                        <Text style={styles.detailValue}>{data.rating.toString().split('').join('.')}</Text>
                    </View>

                </View>









                {/* Description */}
                <Text h4 h4Style={{ fontSize: 16, marginTop: 10, marginBottom: 5 }}>
                    Description
                </Text>
                <Text style={styles.Description}>{data.overview}</Text>

                {/* Cast */}
                <Text h4 h4Style={{ fontSize: 16, marginTop: 10, marginBottom: 10 }}>
                    Cast
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {data.cast.map((data: string, index: number) => (
                        <View style={{ alignItems: "center", marginLeft: 10 }} key={index}>
                            <Avatar
                                avatarStyle={{ borderRadius: 5 }}
                                size={100}
                                source={{
                                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg",
                                }}
                            />
                            <Text style={{ fontSize: 12, marginTop: 5 }}>{data}</Text>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    genrePill: {
        backgroundColor: "#DBE3FF",
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    genreText: {
        fontSize: 12,
        color: "#88A4E8",
        fontWeight: "100",
    },
    detailsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 10,
    },
    detailItem: {
        alignItems: "center",
    },
    detailLabel: {
        fontSize: 12,
        color: "#A0A0A0",
    },
    detailValue: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
    },
    Description: {
        fontSize: 14,
        color: "#A0A0A0",
        lineHeight: 28,
        marginBottom: 10,
    }
});

export default FilmDetails;
