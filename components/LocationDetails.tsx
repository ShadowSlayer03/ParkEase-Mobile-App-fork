import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import CustomButton from "./CustomButton";
import NavigationArrow from "./NavigationArrow";
import { TouchableOpacity } from "react-native";
import { destStore } from "@/store/destStore";
import Animated, { SlideInDown } from "react-native-reanimated";
import { userLocationStore } from "@/store/userLocationStore";
import axios from "axios";
import ShimmerPlaceholder from "react-native-shimmer-placeholder";

interface LocationDetails {
  parkingLotName: string;
  latitude: number,
  longitude: number,
  distance: number,
  totalSlots: number,
  availableSlots: number,
  filledSlots: number,
};

const LocationDetails = () => {
  const { destDetails, clearDest, setNavigationStatus } = destStore();
  const { userLocation } = userLocationStore();
  const [locationDetails, setLocationDetails] = useState<LocationDetails | null>(null);

  const navigateToDest = () => {
    setNavigationStatus(true);
  };

  const fetchLocationDetails = async () => {
    const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

    if (!backendURL) console.error("Could not get BACKEND_URL from .env");

    try {
      const response = await axios.post(`${backendURL}/api/lot-details`,{
        parkingLotName: destDetails?.name,
        userLat: userLocation?.latitude,
        userLon: userLocation?.longitude
      });

      console.log("Response from fetchLocationDetails:", response.data);

      setLocationDetails(response.data);

    } catch (error: any) {
      console.error("Error occurred while getting location details:", error)
    }
  }

  useEffect(() => {
    if (userLocation)
      fetchLocationDetails();
  }, [])

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
      {
        locationDetails?
        <>
          <View className="mt-5 mx-2">
          <Text className="text-xl font-FunnelDisplayBold">
            {locationDetails?.parkingLotName}
          </Text>
          <Text className="text-base font-FunnelDisplayMedium">
            Coordinates: {locationDetails?.latitude.toFixed(4)},{" "}
            {locationDetails?.longitude.toFixed(4)}
          </Text>
          </View>
          <ScrollView
            className="mx-2"
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View className="flex flex-row gap-3 py-4">
              <Text className="text-base font-FunnelDisplayMedium py-1 px-2 rounded-full bg-primary-200">
                {locationDetails?.distance} km
              </Text>
              <Text className="font-FunnelDisplayMedium text-base py-1 px-2 rounded-full bg-primary-200">
                {locationDetails?.totalSlots} spots present
              </Text>
              <Text className="font-FunnelDisplayMedium text-base py-1 px-2 rounded-full bg-primary-200">
                {locationDetails?.filledSlots} spots filled
              </Text>
              <Text className="font-FunnelDisplayMedium text-base py-1 px-2 rounded-full bg-primary-200">
                {locationDetails?.availableSlots} spots available
              </Text>
            </View>
          </ScrollView>
        </>
        :
        <>
          <ShimmerPlaceholder
            style={{ height: 20, width: 200, borderRadius: 4, marginBottom: 8 }}
          />
          <ShimmerPlaceholder
            style={{ height: 16, width: 250, borderRadius: 4 }}
          />
        </>
      }
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
