import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
//Pages
import Saved from './screens/Saved';
import Profile from './screens/Profile';
import WatchVideo from './screens/FilmStack/WatchVideo';
import HomePage from './screens/HomePage';
import FilmDetails from './screens/FilmStack/FilmDetails';
import TabsConfigs, { BottomNavigator_Height } from './util/TabsConfig';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for FilmDetails screen
const FilmStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomePage" options={{ headerShadowVisible: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, title: "FilmKu", headerTitleAlign: "center" }} component={HomePage} />
    <Stack.Screen name="FilmDetails" options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,headerShown:false, }} component={FilmDetails} />
    <Stack.Screen name="Watch" options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }} component={WatchVideo} />
  </Stack.Navigator>
);

// Bottom tabs navigator
const AppNavigator = () => (
  <Tab.Navigator  screenOptions={{ tabBarStyle: { height: BottomNavigator_Height }, tabBarShowLabel: false,headerShadowVisible:false}} >
    <Tab.Screen name="Home" options={{headerShown:false,tabBarIcon:TabsConfigs.Home.Svg,}}  component={FilmStack} />
    <Tab.Screen name='Saved' options={{headerShown:false,tabBarIcon:TabsConfigs.Me.Svg}}component={Saved} />
    <Tab.Screen name='Profile'options={{headerShown:false,tabBarIcon:TabsConfigs.Profile.Svg}} component={Profile} />
    {/* Other Tab Screens */}
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
