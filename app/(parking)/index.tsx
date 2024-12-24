import React, { useEffect, useState } from "react";
import { Image } from "expo-image";
import { images } from "@/constants";
import Svg, { Path } from "react-native-svg";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { destStore } from "@/store/destStore";

interface Slot {
  status: boolean;
}

interface ParkingLotData {
  name: string;
  totalSlots: number;
  slots: Slot[];
}

const ParkingArea = () => {
  const [spotsInfo, setSpotsInfo] = useState([1,0,1,0,10,0]);
  const [parkingLotName, setParkingLotName] = useState("");
  const [filled, setFilled] = useState();
  const [total, setTotal] = useState(0);
  const {destDetails} = destStore();

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const fillTheDetails = (data: ParkingLotData | undefined) => {
    if (!data) return;

    let index;
    data?.map((x,ind)=>{
      if(x.name===destDetails?.name) index = ind;
    })
    // index = index+1;

    setParkingLotName(data[index]?.name);
    setTotal(data[index]?.totalSlots);

    const newArr = Array(data[index]?.totalSlots || 0).fill(0);
    console.log("slots are :",data[index]);
    data[index]?.slots?.forEach((slot, ind) => {
      if (!slot.status) {
        newArr[ind] = 1;
      }
    });

    setSpotsInfo(newArr); // Update state with the new array
  };

  const fetchData = async () => {
    const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

    if (!backendURL) console.error("Could not get BACKEND_URL from .env");

    try {
      const response = await axios.get(`${backendURL}/api/parking-lots`);

      // const data = await response.json();
      // console.log(response.data);
      fillTheDetails(response.data);
    } catch (error) {
      console.error('Error fetching parking lot data:', error);
    }
  }
  return (
    <View className="bg-black h-full">
      <View className="flex flex-row p-2 justify-between">
        <View className="flex flex-row gap-4 items-center">
          <View>
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
          </View>
          <View>
            <Text className="text-white font-FunnelDisplayBold">Location</Text>
            <Text className="text-white text-xl font-FunnelDisplayMedium">
              {parkingLotName || ""}
            </Text>
          </View>
        </View>
        <View className="pr-4">
          <Text className="text-white font-FunnelDisplayMedium">
            Filled: {filled || ""}
          </Text>
          <Text className="text-white font-FunnelDisplayMedium">
            Total: {total || ""}
          </Text>
        </View>
      </View>
      <ScrollView className="p-1">
        {spotsInfo && spotsInfo?.map((data, ind) => {
          return (
            <View className="flex flex-row w-full" key={ind}>
              <View className="w-3/5">
                <View className="relative w-full h-32">
                  <Image
                    source={images.parking_slot}
                    className="h-full w-full"
                  />
                  <View className="absolute h-full w-full flex items-center justify-center">
                    {data && (
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
              <View className="p-2">
                <Text className="text-white p-2 font-JakartaMedium">
                  Slot.no: {ind + 1 || 0}
                </Text>
                <Text className="text-white p-2 font-JakartaMedium">
                  Status: {data ? "filled" : "Empty"}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ParkingArea;
