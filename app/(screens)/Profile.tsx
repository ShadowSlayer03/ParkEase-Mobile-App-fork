import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Image } from "expo-image";
import { useUser, useClerk } from "@clerk/clerk-expo";
import { icons } from "@/constants";
import Svg, { Path } from "react-native-svg";
import { useRouter } from "expo-router";

export default function Profile() {
  const { user } = useUser();
  const [formattedDate, setFormattedDate] = useState("");

  const router = useRouter();
  const { signOut } = useClerk();

  useEffect(() => {
    if (user) {
      const d = new Date(user?.lastSignInAt as Date);
      const readableDate = d.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      setFormattedDate(readableDate);
    }
  }, [user]);

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Sign Out",
          onPress: async () => {
            try {
              await signOut();
              console.log("User signed out successfully");
              router.push("(auth)/welcome");
            } catch (error) {
              console.error("Error signing out:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  const handleContactUsPress = ()=>{
    router.push("contact-us");
  }

  return (
    <View className="bg-[#fcd904] p-8">
      <View className="flex flex-col justify-between h-full w-full">
        <View className="flex flex-col items-center">
          <View className="flex justify-center items-center m-4">
            <Text className="font-FunnelDisplayExtraBold text-4xl">
              {user?.firstName || "My Firstname"}
            </Text>
          </View>

          <View className="flex justify-center items-center m-4">
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : icons.person}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          </View>

          <View className="flex w-[330px] gap-4 mt-4">
            <Text className="text-[18px] font-FunnelSansMedium">
              Full Name: {user?.fullName || "No Data"}
            </Text>
            <Text className="text-[18px] font-FunnelSansMedium">
              Email Address: {user?.emailAddresses[0].emailAddress || "No Data"}
            </Text>
            <Text className="text-[18px] font-FunnelSansMedium">
            Unique ID: {user?.id ? (user.id.length > 10 ? `${user.id.slice(0, 20)}...` : user.id) : "No ID"}
            </Text>
            <Text className="text-[18px] font-FunnelSansMedium">
              Last Sign In: {formattedDate || "No Data"}
            </Text>
          </View>
        </View>

        <View>
          <TouchableOpacity onPress={handleContactUsPress} className="flex flex-row justify-between items-center bg-black p-4 rounded-2xl">
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
                d="M16.712 4.33a9.027 9.027 0 0 1 1.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 0 0-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 0 1 0 9.424m-4.138-5.976a3.736 3.736 0 0 0-.88-1.388 3.737 3.737 0 0 0-1.388-.88m2.268 2.268a3.765 3.765 0 0 1 0 2.528m-2.268-4.796a3.765 3.765 0 0 0-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 0 1-1.388.88m2.268-2.268 4.138 3.448m0 0a9.027 9.027 0 0 1-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0-3.448-4.138m3.448 4.138a9.014 9.014 0 0 1-9.424 0m5.976-4.138a3.765 3.765 0 0 1-2.528 0m0 0a3.736 3.736 0 0 1-1.388-.88 3.737 3.737 0 0 1-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 0 1-1.652-1.306 9.027 9.027 0 0 1-1.306-1.652m0 0 4.138-3.448M4.33 16.712a9.014 9.014 0 0 1 0-9.424m4.138 5.976a3.765 3.765 0 0 1 0-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 0 1 1.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 0 0-1.652 1.306A9.025 9.025 0 0 0 4.33 7.288"
              />
            </Svg>
            <Text className="text-[#fcd904] font-FunnelSansSemiBold">
              Contact Us
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex flex-row bg-black p-4 my-4 rounded-2xl justify-between items-center"
            onPress={handleSignOut}
          >
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
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </Svg>
            <Text className="text-[#fcd904] font-FunnelSansSemiBold">
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
