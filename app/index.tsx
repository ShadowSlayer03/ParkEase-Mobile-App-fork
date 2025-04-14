import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, useRouter } from "expo-router";
import { Alert, SafeAreaView, Text, View } from "react-native";
import { Image } from "expo-image";
import { useUser } from "@clerk/clerk-expo";
import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import { getUserLocation } from "@/utils/getUserLocation";
import { userLocationStore } from "@/store/userLocationStore";
import axios from "axios";

export default function Index() {
  const { isSignedIn, user } = useUser();
  const { setUserLocation } = userLocationStore();
  const router = useRouter();
  const [data,setData] = useState([]);
  const [error,setError] = useState("");

  const [loaded] = useFonts({
    "Funnel-Sans-Bold": require("../assets/fonts/FunnelSans-Bold.ttf"),
    "Funnel-Sans-ExtraBold": require("../assets/fonts/FunnelSans-ExtraBold.ttf"),
    "Funnel-Sans-Light": require("../assets/fonts/FunnelSans-Light.ttf"),
    "Funnel-Sans-Medium": require("../assets/fonts/FunnelSans-Medium.ttf"),
    "Funnel-Sans-Regular": require("../assets/fonts/FunnelSans-Regular.ttf"),
    "Funnel-Sans-SemiBold": require("../assets/fonts/FunnelSans-SemiBold.ttf"),
    "Funnel-Display-Bold": require("../assets/fonts/FunnelDisplay-Bold.ttf"),
    "Funnel-Display-ExtraBold": require("../assets/fonts/FunnelDisplay-ExtraBold.ttf"),
    "Funnel-Display-Light": require("../assets/fonts/FunnelDisplay-Light.ttf"),
    "Funnel-Display-Medium": require("../assets/fonts/FunnelDisplay-Medium.ttf"),
    "Funnel-Display-Regular": require("../assets/fonts/FunnelDisplay-Regular.ttf"),
    "Funnel-Display-SemiBold": require("../assets/fonts/FunnelDisplay-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(console.warn);
      fetchLocation()
    }
  }, [loaded]);

  useEffect(()=>{
    console.log("User after logging in:",user);
  },[user])

  // Async function to fetch data
  const fetchData = async () => {
    try {
      const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;
      // console.log("Backend URL from env:",backendURL);

      if (!backendURL) console.error("Could not get BACKEND_URL from .env");

      const response = await axios.get(`${backendURL}/api/parking-lots`);
  
      setData(response.data);
    } catch (err: any) {
      setError(err.message || "An error occurred");
      Alert.alert("Error", "Failed to load parking slots data");
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData on component mount
  }, []);

  const handlePress = () => {
    if (!isSignedIn) {
      router.push("(auth)/welcome");
    } else {
      router.push("(screens)");
    }
  };

  if (!loaded) {
    return null;
  }

  const fetchLocation = async () => {
    try {
      const location = await getUserLocation();
      //console.log('User location:', location);
      setUserLocation(location);
    } catch (error: any) {
      console.error('Error:', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="relative h-full mt-5 animate-bounce">
        <Image source={images.parkingkaP} style={{ height: 500, width: 300 }} />
        <View className="absolute top-[340px] left-20 gap-3">
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "Funnel-Display-Bold", color: "#fff", fontSize: 35 }}>Find{" "}</Text>
            <Text style={{ fontFamily: "Funnel-Display-Bold", color: "#FFD700", fontSize: 35 }}>Free</Text>
          </View>
          <Text style={{ fontFamily: "Funnel-Display-Bold", color: "#fff", fontSize: 35 }}>Street Parking</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "Funnel-Display-Bold", color: "#fff", fontSize: 35 }}>with{" "}</Text>
            <Text style={{ fontFamily: "Funnel-Display-Bold", color: "#FFD700", fontSize: 35 }}>ParkEase</Text>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 70, width: "100%", alignItems: "center" }}>
          <View style={{ width: "80%" }}>
            <CustomButton title="Start Searching" bgVariant="main" textVariant="primary" onPress={handlePress} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
