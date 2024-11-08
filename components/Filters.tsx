import React, { useState, useEffect } from 'react';
import { Switch, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { filterOptions } from "../constants/dummy_data";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import { filterStore } from '@/store/filterStore';
import CustomButton from './CustomButton';

const Filters = ({ setShowFilter }) => {
  const [isEnabled, setIsEnabld] = useState(false);
  const [distanceMetric, setDitanceMetric] = useState("km");
  const [additionalOptions, setAdditionalOptions] = useState([]);
  const [isSliderActive, setIsSliderActive] = useState(false); // Track slider interaction

  const { setDistanceRange, distanceRange } = filterStore();
  const toggleSheet = () => {
    setShowFilter(false);
  };

  const offset = useSharedValue(1000);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const pan = Gesture.Pan()
    .enabled(!isSliderActive) // Disable gesture while slider is active
    .onChange((e) => {
      const offsetDelta = e.changeY + offset.value;
      const clamp = Math.max(-200, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize((e) => {
      if (offset.value < 100) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(1500, {}, () => {
          runOnJS(toggleSheet)();
        });
      }
    });

  const handleOptionsClick = (ind) => {
    if (additionalOptions.includes(ind)) {
      setAdditionalOptions(additionalOptions.filter((item) => item !== ind));
      return;
    }
    setAdditionalOptions([...additionalOptions, ind]);
  };

  const toggleSwitch = () => {
    setIsEnabld((previousState) => !previousState);
  };

  const changeMetric = () => {
    distanceMetric === "km" ? setDitanceMetric("mile") : setDitanceMetric("km");
  };

  useEffect(() => {
    offset.value = withSpring(0, { stiffness: 150, damping: 25 });
  }, []);

  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[translateY]}
          className="origin-top flex flex-col bg-primary-700 rounded-t-2xl"
        >
          <View className="flex justify-center items-center">
            <Text className="bg-[#575757] rounded-full h-2 w-12 m-2"></Text>
          </View>
          <View>
            <Text className="font-JakartaBold text-white text-center">Filters</Text>
          </View>
          <Text className="w-screen border-t h-1 border-primary-500"></Text>
          <View className="mx-2">
            <View className="flex flex-row justify-between">
              <Text className="font-JakartaLight my-2 text-white">Show only free parking spots</Text>
              <Switch
                trackColor={{ true: '#b59801', false: "#000" }}
                thumbColor={"#FFD602"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View>
              <Text className="text-white">Select the parking type</Text>
              <View></View>
            </View>
            <View>
              <Text className="text-white">Select additional options</Text>
              <View className="w-full flex gap-2 flex-wrap flex-row">
                {filterOptions.map((item, ind) => {
                  return (
                    <TouchableOpacity key={ind} onPress={() => handleOptionsClick(ind)}>
                      <Text
                        className={`px-2 py-1 mx-1 text-gray-100 border rounded-full bg-primary-600 ${
                          additionalOptions.includes(ind)
                            ? " bg-primary-100 text-primary-600"
                            : " bg-primary-600 border-primary-300"
                        }`}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="p-2 text-white">Distance</Text>
              <View className="flex flex-row gap-4">
                <Text className="p-2 text-white">{Math.ceil(distanceRange)}</Text>
                <View className="relative flex p-2 rounded-full items-center justify-center flex-row bg-primary-500">
                  <TouchableWithoutFeedback onPress={changeMetric}>
                    <View
                      className={`z-30 absolute ${distanceMetric === "km" ? " right-1" : " left-1"}`}
                    >
                      <Text className="rounded-full p-1 bg-primary-300 text-primary-600">{distanceMetric}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View className="flex flex-row">
                    <Text className="text-white">mile</Text>
                    <Text className="px-1 text-white">km</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex justify-center">
              <TouchableWithoutFeedback
                onPressIn={() => setIsSliderActive(true)}
                onPressOut={() => setIsSliderActive(false)}
              >
                <Slider
                  thumbTintColor='#FFD602'
                  minimumValue={2}
                  maximumValue={100}
                  onValueChange={(val) => setDistanceRange(val)}
                  minimumTrackTintColor='#FFD602'
                />
              </TouchableWithoutFeedback>
            </View>
            <View></View>
          </View>
          <Text className="w-screen border-t h-1 border-primary-500"></Text>
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <CustomButton
                onPress={() => {/* Handle clear action here */}}
                title="Clear All"
                bgVariant="less-dark"
              />
            </View>
            <View className="flex-1">
              <CustomButton
                onPress={() => {/* Handle clear action here */}}
                title="Apply"
                bgVariant="dark"
              />
            </View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default Filters;
