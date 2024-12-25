import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { images } from "@/constants";
import Svg, { Path } from "react-native-svg";
import { Alert, BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { destStore } from "@/store/destStore";
import { useNavigation } from "expo-router";

interface Slot {
  status: boolean;
}

interface ParkingLotData {
  name: string;
  totalSlots: number;
  slots: Slot[];
}

const ParkingArea = () => {
  const [spotsInfo, setSpotsInfo] = useState<number[]>([]);
  const [parkingLotName, setParkingLotName] = useState("");
  const [filled, setFilled] = useState(0);
  const [total, setTotal] = useState(0);
  const { destDetails, clearDest } = destStore();

  const navigation = useNavigation();

  useEffect(() => {
    clearDest();
    const interval = setInterval(() => {
      fetchData();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      const backAction = () => {
          Alert.alert("Hold on!", "Was i helpful?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            {
              text: "YES",
              onPress: () => {
                if (navigation.canGoBack()) {
                  navigation.goBack(); 
                }
              },
            },
          ]);
          return true;
      };
  
      BackHandler.addEventListener("hardwareBackPress", backAction);
  
      // Cleanup the listener on unmount
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", backAction);
      };
    }, []);

  const fillTheDetails = (data: ParkingLotData[]) => {
    if (!data || data.length === 0) return;

    const targetLot = data.find((lot) => lot.name === destDetails?.name);
    if (!targetLot) return;

    setParkingLotName(targetLot.name);
    setTotal(targetLot.totalSlots);

    const newArr = Array(targetLot.totalSlots).fill(0);
    targetLot.slots.forEach((slot, ind) => {
      if (slot.status) {
        newArr[ind] = 1;
      }
    });

    setSpotsInfo(newArr); // Update state with the new array
    setFilled(targetLot.slots.filter((slot) => slot.status).length);
  };

  const fetchData = async () => {
    const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

    if (!backendURL) {
      console.error("Could not get BACKEND_URL from .env");
      return;
    }

    try {
      const response = await axios.get(`${backendURL}/api/parking-lots`);
      fillTheDetails(response.data);
      // console.log(destDetails);
    } catch (error) {
      console.error("Error fetching parking lot data:", error);
    }
  };

  return (
    <View className="bg-black h-full">
      <View className="flex flex-row p-2 justify-between mb-8">
        <View className="flex flex-row gap-4 items-center">
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-10 h-10"
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </Svg>
          <View>
            <Text className="text-white font-FunnelDisplayBold">Location</Text>
            <Text className="text-white text-xl font-FunnelDisplayMedium">
              {parkingLotName || ""}
            </Text>
          </View>
        </View>
        <View className="pr-4">
          <Text className="text-white font-FunnelDisplayMedium">
            Filled: {filled}
          </Text>
          <Text className="text-white font-FunnelDisplayMedium">
            Total: {total}
          </Text>
        </View>
      </View>
      <ScrollView className="p-1">
        {spotsInfo.map((data, ind) => (
          <View className="flex flex-row w-full" key={ind}>
            <View className="w-3/5">
              <View className="relative w-full h-32">
                <Image
                  source={images.parking_slot}
                  className="h-full w-full"
                />
                <View className="absolute h-full w-full flex items-center justify-center">
                  {data === 1 && (
                    <Image
                      source={images.car_top_view}
                      className="w-9/12 h-20"
                    />
                  )}
                </View>
              </View>
              <View className="h-2 w-full bg-transparent m-1">
                <Image
                  source={images.dotted_lines}
                  className="h-full w-full "
                  contentFit="cover"
                />
              </View>
            </View>
            <View className="p-2 flex flex-col justify-center">
              <Text className="text-[16px] text-white p-2 font-FunnelSansSemiBold">
                Slot.no: {ind + 1}
              </Text>
              <Text className="text-[16px] text-white px-2 font-FunnelSansSemiBold">
                Status: {data === 1 ? "Filled" : "Empty"}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ParkingArea;
