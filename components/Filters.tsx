import React, { useState, useEffect } from "react";
import {
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Slider from "@react-native-community/slider";
import { filterStore } from "@/store/filterStore";
import CustomButton from "./CustomButton";

interface FiltersProps {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

const Filters = ({ setShowFilter }:FiltersProps) => {
  const [isEnabled, setIsEnabld] = useState(false);
  const [distanceMetric, setDitanceMetric] = useState("km");
  const [isSliderActive, setIsSliderActive] = useState(false);

  const { setDistanceRange, distanceRange } = filterStore();
  const toggleSheet = () => {
    setShowFilter(false);
  };

  const offset = useSharedValue(1000);

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const pan = Gesture.Pan()
    .enabled(!isSliderActive)
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
            <Text className="p-3 font-FunnelDisplayBold text-white text-xl text-center">
              Filters
            </Text>
          </View>
          <Text className="w-screen border-t h-1 border-primary-500"></Text>
          <View className="mx-2">
            <View className="flex flex-row justify-between">
              <Text className="font-FunnelDisplayMedium px-2 py-4 text-white">
                Show only free parking spots
              </Text>
              <Switch
                trackColor={{ true: "#b59801", false: "#000" }}
                thumbColor={"#FFD602"}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View className="flex flex-row py-3 justify-between">
              <Text className="p-2 text-white font-FunnelDisplayMedium">Distance</Text>
              <View className="flex flex-row gap-4">
                <Text className="p-2 text-white">
                  {Math.ceil(distanceRange)}
                </Text>
                <View className="relative flex p-2 rounded-full items-center justify-center flex-row bg-primary-500">
                  <TouchableWithoutFeedback onPress={changeMetric}>
                    <View
                      className={`z-30 absolute ${
                        distanceMetric === "km" ? " right-1" : " left-1"
                      }`}
                    >
                      <Text className="rounded-full p-1 bg-primary-300 text-primary-600">
                        {distanceMetric}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  <View className="flex flex-row">
                    <Text className="text-white font-FunnelSansMedium">mile</Text>
                    <Text className="px-1 text-white font-FunnelSansMedium">km</Text>
                  </View>
                </View>
              </View>
            </View>
            <View className="flex justify-center pb-4">
              <TouchableWithoutFeedback
                onPressIn={() => setIsSliderActive(true)}
                onPressOut={() => setIsSliderActive(false)}
              >
                <Slider
                  thumbTintColor="#FFD602"
                  minimumValue={2}
                  maximumValue={100}
                  onValueChange={(val) => setDistanceRange(val)}
                  minimumTrackTintColor="#FFD602"
                />
              </TouchableWithoutFeedback>
              <View className="flex px-2 flex-row w-full justify-between">
                <Text className="text-white">2</Text>
                <Text className="text-white">100</Text>
              </View>
            </View>
            <View></View>
          </View>
          <Text className="w-screen border-t h-1 border-primary-500"></Text>
          <View className="flex-row space-x-4 p-3">
            <View className="flex-1">
              <CustomButton
                onPress={() => {
                  /* Handle clear action here */
                }}
                title="Clear All"
                bgVariant="less-dark"
              />
            </View>
            <View className="flex-1">
              <CustomButton
                onPress={() => {
                  /* Handle clear action here */
                }}
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
