import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import * as ScreenOrientation from 'expo-screen-orientation';


const WatchVideo = () => {
    //id will come from useRoute..
    const videoUrl = 'https://vidsrc.to/embed/movie/385687';


    const handleNavigationChange = (navState: any) => {

        if (navState.url !== videoUrl && !navState.url.includes('vidsrc.to')) {
            Alert.alert('External Link Blocked', 'Opening links in an external browser is disabled.');
        }
    };

    useEffect(() => {

        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);


        return () => {
            ScreenOrientation.unlockAsync();  // Restore the default orientation behavior
        };
    }, []);

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: videoUrl }}
                style={styles.webView}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                onNavigationStateChange={handleNavigationChange}
                startInLoadingState={true}
                mixedContentMode="compatibility"
                allowsInlineMediaPlayback={true}
                mediaPlaybackRequiresUserAction={false}
                useWebKit={true}
                originWhitelist={['*']}
                onError={(syntheticEvent) => console.warn(syntheticEvent.nativeEvent)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    webView: {
        flex: 2,
        width: '100%',
    },
});

export default WatchVideo;
