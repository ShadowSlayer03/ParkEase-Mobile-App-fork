import { useActivityStore } from "@/store/activityStore";
import React from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Activity = () => {
  const { previousRides, clearRides } = useActivityStore();

  return (
    <SafeAreaView className="p-7 h-full bg-[#fcd904]">
      <View className="mt-5 flex-row justify-between items-center">
        <Text className="text-4xl font-FunnelDisplayBold">Your Activity</Text>

        {previousRides.length > 0 && (
          <TouchableOpacity onPress={() => clearRides()}>
            <Text className="text-2xl text-black font-FunnelDisplayBold">X</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView className="mt-12">
        {previousRides.length > 0 ? (
          previousRides.map((item, ind) => (
            <View key={ind} className="flex p-4 bg-black rounded-xl mb-5">
              <Text className="font-FunnelSansMedium text-[16px] text-[#fcd904]">
                Parking Lot: {item.destination}
              </Text>
              <Text className="font-FunnelSansMedium text-[16px] text-[#fcd904]">
                Date: {item.time}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-center text-xl text-black mt-20 font-FunnelSansExtraBold">
            No rides found 🚗💨
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activity;
