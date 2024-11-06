import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps,
} from 'react-native-reanimated';
import { useColorScheme } from 'react-native'; // Using React Native's useColorScheme
import { filterStore } from '@/store/filterStore';

const INITIAL_BOX_SIZE = 5;
const SLIDER_WIDTH = 270;

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const Slider = () => {
  const colorScheme = useColorScheme(); // Use React Native's useColorScheme hook
  const offset = useSharedValue(0);
  const boxWidth = useSharedValue(INITIAL_BOX_SIZE);
  const MAX_VALUE = SLIDER_WIDTH - INITIAL_BOX_SIZE;

  const pan = Gesture.Pan().onChange((event) => {
    // Calculate the new position, clamped between 0 and MAX_VALUE
    const newPosition = Math.min(Math.max(offset.value + event.changeX, 0), MAX_VALUE);
  
    // Update the offset and box width
    offset.value = newPosition;
    boxWidth.value = INITIAL_BOX_SIZE + newPosition;
  });

  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const animatedBoxTextColor = {
    color: colorScheme === 'light' ? '#001a72' : '#f8f9ff',
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(boxWidth.value/ 2.7)}`,
      defaultValue: `${boxWidth.value}`,
    };
  });

  return (
    <GestureHandlerRootView className="flex-1 justify-center items-center gap-2">
      <AnimatedTextInput
        animatedProps={animatedProps}
        style={[animatedBoxTextColor]}
        editable={false}
      />
      <View className="w-80 bg-primary-500 rounded-full p-5 h-12">
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.sliderHandle, sliderStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 50,
    backgroundColor: '#82cab2',
    borderRadius: 25,
    justifyContent: 'center',
    padding: 5,
  },
  sliderHandle: {
    width: 40,
    height: 40,
    backgroundColor: '#f8f9ff',
    borderRadius: 20,
    position: 'absolute',
    left: 5,
  },
});

export default Slider;
