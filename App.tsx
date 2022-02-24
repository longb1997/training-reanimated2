/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import CommonButton from './src/components/CommonButton';
import Timing from './src/screen/Timing';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}: any) => {
  const goTiming = () => {
    navigation.navigate('Timing');
  };
  return (
    <SafeAreaView style={styles.container}>
      <CommonButton text="Timing" onPress={goTiming} />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Timing" component={Timing} />
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
