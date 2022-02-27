import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient, {
  LinearGradientProps,
} from 'react-native-linear-gradient';
import Animated, {
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ColorPickerProps extends LinearGradientProps {
  colors: string[];
  onChangedColor?: (color: string | number) => void;
}

const {width} = Dimensions.get('window');

const PICKER_WIDTH = width * 0.9;
const CIRCLE_PICKER_SIZE = 40;

const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  colors,
  start,
  end,
  onChangedColor,
}) => {
  const translateX = useSharedValue(0);

  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const ajustedTransalteX = useDerivedValue(() => {
    console.log(translateX.value);
    return Math.min(
      Math.max(translateX.value, 0),
      PICKER_WIDTH - CIRCLE_PICKER_SIZE,
    );
  });
  const onEnd = () => {
    'worklet';
    translateY.value = withSpring(0);
    scale.value = withSpring(1);
  };
  const PanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number}
  >({
    onStart: (_, context) => {
      context.x = ajustedTransalteX.value;
      //   translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
      //   scale.value = withSpring(1.2);
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.x;
    },
    onEnd,
  });

  const TapGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
      onStart: event => {
        translateY.value = withSpring(-CIRCLE_PICKER_SIZE);
        scale.value = withSpring(1.2);
        translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE);
      },
      onEnd,
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: ajustedTransalteX.value},
        {scale: scale.value},
        {translateY: translateY.value},
      ],
    };
  });

  const rInternalStyle = useAnimatedStyle(() => {
    const inputColor = colors.map((color, index) =>
      Number((index / colors.length) * PICKER_WIDTH),
    );

    const backgroundColor = interpolateColor(
      translateX.value,
      inputColor,
      colors,
    );

    onChangedColor?.(backgroundColor);

    return {
      backgroundColor,
    };
  });

  return (
    <TapGestureHandler onGestureEvent={TapGestureEvent}>
      <Animated.View>
        <Animated.View style={{justifyContent: 'center'}}>
          <LinearGradient
            start={start}
            end={end}
            colors={colors}
            style={styles.container}
          />
          <PanGestureHandler onGestureEvent={PanGestureEvent}>
            <Animated.View style={[styles.picker, rStyle]}>
              <Animated.View style={[styles.internalPicker, rInternalStyle]} />
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default ColorPickerComponent;

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: PICKER_WIDTH,
    borderRadius: 20,
  },
  picker: {
    position: 'absolute',
    backgroundColor: '#FFF',
    width: CIRCLE_PICKER_SIZE,
    height: CIRCLE_PICKER_SIZE,
    borderRadius: CIRCLE_PICKER_SIZE / 2,
    justifyContent: 'center',
  },
  internalPicker: {
    alignSelf: 'center',
    width: CIRCLE_PICKER_SIZE / 2,
    height: CIRCLE_PICKER_SIZE / 2,
    borderRadius: CIRCLE_PICKER_SIZE / 4,
  },
});
