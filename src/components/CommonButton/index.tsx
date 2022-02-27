import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const CommonButton = ({text, onPress, containerStyle, textStyle}: any) => {
  return (
    <Pressable style={[styles.container, containerStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 50,
  },
  text: {
    fontSize: 14,
    color: '#30458D',
    textAlign: 'center',
  },
});
