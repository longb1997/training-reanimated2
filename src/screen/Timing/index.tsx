import React, {useEffect} from 'react';
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const SIZE = 100.0;

const Timing = () => {
  const progress = useSharedValue(0);
  const border = useSharedValue(0);

  const reAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: border.value,
    };
  });

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 2000}), -1, true);
    border.value = withRepeat(withTiming(SIZE / 3, {duration: 2000}), -1, true);
  }, [border, border.value, progress, progress.value]);

  const triggerAnimation = () => {
    Alert.alert('sadfs');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={triggerAnimation}>
        <Text>Timing in 2s</Text>
      </Pressable>
      <Animated.View
        style={[
          {height: SIZE, width: SIZE, backgroundColor: 'blue'},
          reAnimatedStyle,
        ]}
      />
    </View>
  );
};

export default Timing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
