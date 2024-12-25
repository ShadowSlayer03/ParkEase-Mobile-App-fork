import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import { icons } from "@/constants";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";
import axios from "axios";

export default function ContactUs() {
  const { user } = useUser();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const router = useRouter();

  const handleSendMessage = async () => {
    if (message.trim() === "") {
      Alert.alert("Please enter a message before sending.");
      return;
    }

    const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;

    if (!backendURL) {
      console.error("Could not get BACKEND_URL from .env");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(`${backendURL}/api/send-feedback`, {
        name: user?.fullName,
        email: user?.emailAddresses[0]?.emailAddress,
        message: message,
      });

      console.log("Response from send-feedback:", response.data);

      if (response.data.success) {
        Alert.alert("Message Sent", response.data.message);
      } else {
        Alert.alert("Some error occurred in sending your feedback. Please try again later.");
      }

      setMessage("");
    } catch (error) {
      console.error("Error sending feedback:", error);
      Alert.alert("Error", "Could not send your message. Please try again.");
    } finally {
      setIsLoading(false); // End loading
    }
  };

  const handleBackPress = () => {
    router.push("/(screens)/Profile");
  };

  return (
    <View className="bg-[#fcd904] p-8">
      <View className="flex flex-col justify-between h-full w-full">
        <View className="flex flex-col items-center">
          <View className="flex justify-center items-center m-4">
            <Text className="font-FunnelDisplayExtraBold text-4xl">Contact Us</Text>
          </View>

          <View className="flex justify-center items-center m-4">
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : icons.person}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>

          <View className="flex gap-4 justify-start items-center mt-4">
            <Text className="text-3xl font-FunnelSansBold">{user?.fullName || "Your Full Name"}</Text>
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

          {isLoading ? (
            <ActivityIndicator size="large" color="#000" className="mt-4" />
          ) : (
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-black p-4 rounded-2xl mt-4"
            >
              <Text className="text-[#fcd904] font-FunnelSansSemiBold text-center">Send Message</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={handleBackPress}
          className="flex flex-row justify-between items-center bg-black p-4 rounded-2xl mb-12"
        >
          <Svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fcd904"
            width={30}
            height={30}
          >
            <Path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </Svg>
          <Text className="text-[#fcd904] font-FunnelSansSemiBold">Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
