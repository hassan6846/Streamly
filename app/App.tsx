import { StatusBar } from 'expo-status-bar';
import { Text, View, ActivityIndicator } from 'react-native';
//screens
import HomePage from './screens/HomePage';
import OfflinePage from './screens/OfflinePage';
import WatchVideo from './screens/FilmStack/WatchVideo';
import FilmDetails from './screens/FilmStack/FilmDetails';

//font
import * as Font from 'expo-font';

import { useState, useEffect } from 'react';

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {

    const loadFont = async () => {
      await Font.loadAsync({
        Outfit: require('./assets/font/outfit.ttf'),
      });
      setFontLoaded(true);
    };

    loadFont();
  }, []);
  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size="large"
        />
      </View>
    );
  }
  return (
    <FilmDetails />
  );
}


