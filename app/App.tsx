import React, { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";

// Screens
import HomePage from "./screens/HomePage";
import OfflinePage from "./screens/OfflinePage";
import FilmDetails from "./screens/FilmStack/FilmDetails";
import WatchVideo from "./screens/FilmStack/WatchVideo";
import Saved from "./screens/Saved";
import Profile from "./screens/Profile";

// Tab Configurations
import TabsConfigs from "./util/TabsConfig";


// Tab Navigator
const Tab = createBottomTabNavigator();

// Stack Navigator
const Stack = createStackNavigator();

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading process (e.g., fonts, data fetching)
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",backgroundColor:"#fff" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Tab Navigator for Bottom Tabs
  const BottomTabs = () => (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarStyle: { height: 80 } }}>
      <Tab.Screen name="Home" component={HomePage} options={{ tabBarIcon: TabsConfigs.Home.Svg ,headerShown:true,headerTitleAlign:"center",headerTitle:"FilmKu",headerShadowVisible:false}} />
      <Tab.Screen name="Saved" component={Saved} options={{ tabBarIcon: TabsConfigs.Me.Svg }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: TabsConfigs.Profile.Svg }} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      {/* Root Stack Navigator */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab Navigator */}
        <Stack.Screen options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name="MainTabs" component={BottomTabs} />

        {/* Screens outside of Tabs */}
        <Stack.Screen options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}} name="FilmDetails" component={FilmDetails} />
        <Stack.Screen  options={{cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS}}name="WatchVideo" component={WatchVideo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
