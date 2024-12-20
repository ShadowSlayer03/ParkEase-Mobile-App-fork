import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import CustomButton from "./CustomButton";
import NavigationArrow from "./NavigationArrow";
import { TouchableOpacity } from "react-native";
import { destStore } from "@/store/destStore";
import Animated, { SlideInDown } from "react-native-reanimated";
import useApi from "@/hooks/useApi";

const LocationDetails = () => {
  const { destDetails, clearDest, setNavigationStatus } = destStore();

  const navigateToDest = () => {
    setNavigationStatus(true);
  };

  const locationDetails = {
    name: "NIE-Admin Block",
    location: "Manandvadi road, NIE",
    list_details: {
      distance: 2100,
      spots_left: 2,
      no_of_slots: 20,
      filled: 18,
    },
  };

  const { data, isLoading, error } = useApi("/api/locationDetails");

  return (
    <Animated.View
      entering={SlideInDown.springify()}
      className="relative px-2 bg-primary-300 rounded-t-2xl"
    >
      <View className="top-2 absolute z-20 w-full flex p-1 items-end justify-end">
        <TouchableOpacity
          onPress={() => {
            clearDest();
          }}
        >
          <Svg
            fill="none"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#57595d"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </Svg>
        </TouchableOpacity>
      </View>
      <View className="mt-5 mx-2">
        <Text className="text-xl font-FunnelDisplayBold">
          {destDetails?.name}
        </Text>
        <Text className="text-base font-FunnelDisplayMedium">
          Coordinates: {destDetails?.latitude.toFixed(4)},{" "}
          {destDetails?.longitude.toFixed(4)}
        </Text>
      </View>
      <ScrollView
        className="mx-2"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-row gap-3 py-4">
          <Text className="text-base font-FunnelDisplayMedium py-1 px-2 rounded-full bg-primary-200">
            {locationDetails.list_details.distance / 1000} km
          </Text>
          <Text className="font-FunnelDisplayMedium text-base py-1 px-2 rounded-full bg-primary-200">
            {locationDetails.list_details.no_of_slots} spots present
          </Text>
          <Text className="font-FunnelDisplayMedium text-base py-1 px-2 rounded-full bg-primary-200">
            {locationDetails.list_details.filled} spots filled
          </Text>
          <Text className="font-FunnelDisplayMedium text-base py-1 px-2 rounded-full bg-primary-200">
            {locationDetails.list_details.spots_left} spots available
          </Text>
        </View>
      </ScrollView>
      <View className="mx-2 mb-5">
        <CustomButton
          bgVariant="dark"
          title="Navigate"
          onPress={navigateToDest}
          IconLeft={() => <NavigationArrow />}
        />
      </View>
      <View className="Extra h-32"></View>
    </Animated.View>
  );
};

export default LocationDetails;
