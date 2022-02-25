import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Page from '../../components/Page';

const TITLE = ['HELLO', "WHAT'S", 'UP', 'bro'];

const Swiper = () => {
  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      pagingEnabled
      style={styles.container}
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}>
      {TITLE.map((title, index) => (
        <Page
          key={index.toString()}
          title={title}
          index={index}
          translateX={translateX}
        />
      ))}
    </Animated.ScrollView>
  );
};

export default Swiper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
