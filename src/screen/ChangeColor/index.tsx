import React, {useState} from 'react';
import {Dimensions, StyleSheet, Switch} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

const SIZE = Dimensions.get('window').width * 0.7;

type Theme = 'dark' | 'light';

const SWITCH_TRACK_COLOR = {
  true: 'rgba(256,0,256,0.2)',
  false: 'rgba(0,0,0,0.1)',
};

const Colors = {
  dark: {
    background: '#1E1E1E',
    circle: '#252525',
    text: '#F8f8f8',
  },
  light: {
    background: '#F8f8f8',
    circle: '#FFF',
    text: '#1e1e1e',
  },
};

const ChangeColor = () => {
  const [theme, setTheme] = useState<Theme>('light');
  //   const progress = useSharedValue(0);

  const progress = useDerivedValue(() => {
    return theme === 'light' ? withTiming(0) : withTiming(1);
  }, [theme]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.background, Colors.dark.background],
    );
    return {
      backgroundColor,
    };
  });

  const rCStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.circle, Colors.dark.circle],
    );
    return {
      backgroundColor,
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.light.text, Colors.dark.text],
    );
    return {
      color,
    };
  });

  return (
    <Animated.View style={[styles.container, rStyle]}>
      <Animated.Text style={[styles.text, rTextStyle]}>THEME</Animated.Text>
      <Animated.View style={[styles.circle, rCStyle]}>
        <Switch
          value={theme === 'dark'}
          onValueChange={toggled => setTheme(toggled ? 'dark' : 'light')}
          trackColor={SWITCH_TRACK_COLOR}
          thumbColor="violet"
        />
      </Animated.View>
    </Animated.View>
  );
};

export default ChangeColor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'blue',
    borderRadius: SIZE / 2,
  },
  circle: {
    width: SIZE,
    height: SIZE,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZE / 2,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 8,
  },
  text: {
    fontSize: 50,
    letterSpacing: 15,
    fontWeight: '600',
  },
});
