import "react-native-gesture-handler"
import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar"
// Screens
import HomePage from "./screens/HomePage";
import FilmDetails from "./screens/FilmStack/FilmDetails";
import WatchVideo from "./screens/FilmStack/WatchVideo";
import Saved from "./screens/Saved";
import Profile from "./screens/Profile";
import SearchPage from "./screens/SearchPage";
import OfflinePage from "./screens/OfflinePage";
// Tab Configurations
import TabsConfigs from "./util/TabsConfig";
//ui
import { Icon } from "@rneui/themed";
//  Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Tab Navigator for Bottom Tabs
  const BottomTabs = ({ navigation }: { navigation: any }) => (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: 80 } }}>
      <Tab.Screen name="Home" component={HomePage} options={{
        tabBarIcon: TabsConfigs.Home.Svg, headerShown: true, headerTitleAlign: "center", headerTitle: "FilmKu", headerShadowVisible: false,
        headerRight: (() => (
          <Icon onPress={() => navigation.navigate("Search")} size={20} iconStyle={{ padding: 10, borderRadius: 60 }} containerStyle={{ marginRight: 30 }} name="search" type="material" />
        )),
        headerLeft: (() => (
          <Icon iconStyle={{ padding: 10, borderRadius: 60 }} size={20} containerStyle={{ marginLeft: 30 }} name="menuunfold" type="antdesign" />
        ))

      }} />
      <Tab.Screen name="Saved" component={Saved} options={{ tabBarIcon: TabsConfigs.Me.Svg }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: TabsConfigs.Profile.Svg }} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} name="MainTabs" component={BottomTabs} />
        <Stack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} name="FilmDetails" component={FilmDetails} />
        <Stack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} name="WatchVideo" component={WatchVideo} />
        <Stack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS, presentation: "modal", detachPreviousScreen: true }} name="Search" component={SearchPage} />
        <Stack.Screen options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} component={OfflinePage} name="Offline" />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default App;
