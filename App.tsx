import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CommonButton from './src/components/CommonButton';
import ChangeColor from './src/screen/ChangeColor';
import GestureHandle from './src/screen/GestureHandle';
import ImageViewer from './src/screen/ImageViewer';
import Swiper from './src/screen/Swiper';
import Timing from './src/screen/Timing';

const Stack = createNativeStackNavigator();
import {LogBox} from 'react-native';
import InstagramLike from './src/screen/InstagramLike';
import ColorPicker from './src/screen/ColorPicker';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const HomeScreen = ({navigation}: any) => {
  const goScreen = (name: string) => {
    navigation.navigate(name);
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonButton text="Timing" onPress={() => goScreen('Timing')} />
      <CommonButton
        text="GestureHandle"
        onPress={() => goScreen('GestureHandle')}
      />
      <CommonButton text="Swiper" onPress={() => goScreen('Swiper')} />
      <CommonButton
        text="Change Color"
        onPress={() => goScreen('ChangeColor')}
      />
      <CommonButton
        text="Image Viewer"
        onPress={() => goScreen('ImageViewer')}
      />
      <CommonButton
        text="Instagram Like"
        onPress={() => goScreen('InstagramLike')}
      />
      <CommonButton
        text="Color Picker"
        onPress={() => goScreen('ColorPicker')}
      />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timing" component={Timing} />
        <Stack.Screen name="GestureHandle" component={GestureHandle} />
        <Stack.Screen name="Swiper" component={Swiper} />
        <Stack.Screen name="ChangeColor" component={ChangeColor} />
        <Stack.Screen name="ImageViewer" component={ImageViewer} />
        <Stack.Screen name="InstagramLike" component={InstagramLike} />
        <Stack.Screen name="ColorPicker" component={ColorPicker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
