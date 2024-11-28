import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
//ui
import { Avatar } from "@rneui/themed"
import { SafeAreaView } from 'react-native-safe-area-context'

//state
import { useRoute } from '@react-navigation/native'
import { Icon, Text } from '@rneui/themed'

const FilmDetails = ({ navigation }: { navigation: any }) => {

    const route = useRoute<any>();
    const { data } = route.params;
    useEffect(() => {
        console.log(data)
    })
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff', padding: 20, }}>


                <Avatar onPress={()=>navigation.navigate("Watch",{
                    data:data
                })} containerStyle={{ width: '100%', height: 200 }} avatarStyle={{ borderRadius: 10 }} source={{ uri: data.imageSet.horizontalPoster.w1080 }} />

                <View>
                    <Text style={{ marginTop: 10, marginBottom: 10 }} h3>{data.title}</Text>
                </View>

                <Text h4 h4Style={{ fontSize: 16, marginTop: 10, marginBottom: 5 }}>Description</Text>
                <Text>{data.overview}</Text>

                <Text h4 h4Style={{ fontSize: 16, marginTop: 10, marginBottom: 5 }}>Cast</Text>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        data.cast.map((data, index) => (
                            <View style={{ alignItems: "center", marginLeft: 10 }} key={index}>


                                <Avatar avatarStyle={{ borderRadius: 5 }} size={100} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg" }} />
                                <Text style={{ fontSize: 12, marginTop: 5 }}>{data}</Text>
                            </View>
                        ))
                    }
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

})
export default FilmDetails