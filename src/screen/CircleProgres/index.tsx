import {useHeaderHeight} from '@react-navigation/elements';
import React, {useCallback} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ReText} from 'react-native-redash';
import Svg, {Circle} from 'react-native-svg';
import CommonButton from '../../components/CommonButton';
const {width, height} = Dimensions.get('window');
const CIRCLE_LENGTH = 1000; //2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#A6E1FA';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircleProgress = () => {
  const progress = useSharedValue(0);
  const headerHeight = useHeaderHeight();

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const progressNumber = useDerivedValue(() => {
    return `${Math.floor(progress.value * 100)}`;
  });

  const onPressRun = useCallback(() => {
    progress.value = withTiming(progress.value > 0 ? 0 : 1, {duration: 2000});
  }, [progress]);

  return (
    <View style={styles.container}>
      <ReText style={styles.progressText} text={progressNumber} />
      <Svg style={{position: 'absolute'}}>
        <Circle
          cx={width / 2}
          cy={height / 2 - headerHeight / 2}
          r={R}
          stroke={BACKGROUND_STROKE_COLOR}
          strokeWidth={30}
        />
        <AnimatedCircle
          cx={width / 2}
          cy={height / 2 - headerHeight / 2}
          r={R}
          stroke={STROKE_COLOR}
          strokeWidth={15}
          strokeDasharray={CIRCLE_LENGTH}
          animatedProps={animatedProps}
          strokeLinecap={'round'}
        />
      </Svg>
      <CommonButton
        text="Run"
        containerStyle={styles.button}
        textStyle={styles.buttonText}
        onPress={onPressRun}
      />
    </View>
  );
};

export default CircleProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 80,
    color: 'rgba(256,256,256,0.7)',
    width: 200,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 80,
    width: width * 0.7,
    height: 60,
    backgroundColor: BACKGROUND_STROKE_COLOR,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: '#FFF',
    letterSpacing: 2,
  },
});
