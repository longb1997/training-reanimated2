import React, {useRef} from 'react';
import {Dimensions, Image, ImageBackground, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from 'react-native-reanimated';

const {width: SIZE} = Dimensions.get('window');
const imageUri =
  'https://static.wikia.nocookie.net/virtualyoutuber/images/5/58/Uruha_Rushia_Portrait.png/revision/latest?cb=20220107034300&path-prefix=vi';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const InstagramLike = () => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
    opacity: opacity.value,
  }));

  const onDoubleTap = () => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withSequence(
          withSpring(1),
          withDelay(500, withSpring(0, {overshootClamping: true})),
        );
      }
    });
    opacity.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        opacity.value = withDelay(500, withSpring(0));
      }
    });
  };

  const doubleTapRef = useRef();
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TapGestureHandler
        waitFor={doubleTapRef}
        onActivated={() => {
          console.log('single tap');
        }}>
        <TapGestureHandler
          maxDelayMs={250}
          ref={doubleTapRef}
          numberOfTaps={2}
          onActivated={onDoubleTap}>
          <Animated.View>
            <ImageBackground
              source={{uri: imageUri}}
              style={[
                {
                  width: SIZE,
                  height: SIZE,
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <AnimatedImage
                source={require('../../assets/heart.png')}
                style={[
                  {
                    width: SIZE / 2,
                    height: SIZE / 2,
                  },
                  rStyle,
                ]}
                resizeMode={'center'}
              />
            </ImageBackground>
          </Animated.View>
        </TapGestureHandler>
      </TapGestureHandler>
    </View>
  );
};

export default InstagramLike;
