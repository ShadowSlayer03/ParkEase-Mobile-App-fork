import { previousRides } from "@/constants/parking-areas/markers";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Activity = () => {
  return (
    <SafeAreaView className="p-7 h-full bg-[#fcd904]">
      <View className="mt-5">
        <Text className="text-4xl font-FunnelDisplayBold">Your Activity</Text>
      </View>
      <ScrollView className="mt-12">
        {previousRides.map((item, ind) => {
          return (
            <View key={ind} className="flex p-4 bg-black rounded-xl mb-5">
              <Text className="font-FunnelSansMedium text-[16px] text-[#fcd904]">
                Parking Lot: {item.destination}
              </Text>
              <Text className="font-FunnelSansMedium text-[16px] text-[#fcd904]">
                Date: {item.time}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
