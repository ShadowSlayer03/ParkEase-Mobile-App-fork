import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import { icons } from "@/constants";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

export default function ContactUs() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSendMessage = () => {
    if (message.trim() === "") {
      Alert.alert("Please enter a message before sending.");
      return;
    }

    Alert.alert("Message Sent", "Your message has been sent successfully.");
  };

  const handleBackPress = () => {
    router.push("/(screens)/Profile")
  }

  return (
    <View className="bg-[#fcd904] p-8">
      <View className="flex flex-col justify-between h-full w-full">
        <View className="flex flex-col items-center">
          <View className="flex justify-center items-center m-4">
            <Text className="font-FunnelDisplayExtraBold text-4xl">
              Contact Us
            </Text>
          </View>

          <View className="flex justify-center items-center m-4">
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : icons.person}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>

          <View className="flex gap-4 justify-start items-center mt-4">
            <Text className="text-3xl font-FunnelSansBold">
              {user?.fullName || "Your Full Name"}
            </Text>
            <Text className="text-[18px] font-FunnelSansSemiBold">
              {user?.emailAddresses[0]?.emailAddress || "Your Email Address"}
            </Text>
          </View>

          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Write your feedback/suggestions here"
            multiline
            numberOfLines={4}
            className="w-[95%] bg-white p-4 rounded-2xl mt-4 font-FunnelSansMedium"
            style={{ height: 120, textAlignVertical: "top" }}
          />

          <TouchableOpacity
            onPress={handleSendMessage}
            className="bg-black p-4 rounded-2xl mt-4"
          >
            <Text className="text-[#fcd904] font-FunnelSansSemiBold text-center">
              Send Message
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleBackPress} className="flex flex-row justify-between items-center bg-black p-4 rounded-2xl mb-12">
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fcd904"
            width={30}
            height={30}
          >
            <Path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </Svg>
          <Text className="text-[#fcd904] font-FunnelSansSemiBold">
            Go Back
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
