import { useFonts } from "expo-font";
import { Link, SplashScreen, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View, Alert } from "react-native";
import "react-native-get-random-values";
import * as Location from "expo-location";
import { userLocationStore } from "@/store/userLocationStore";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const [errorMsg, setErrorMsg] = useState("");
  const { setUserLocation } = userLocationStore();
  const { user, isSignedIn } = useUser();
  const navigate = useNavigation().navigate;

  const handlePress = () => {
    if (!isSignedIn) {
      navigate("(auth)");
    } else {
      navigate("(screens)");
    }
  };

  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().catch(console.warn);
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      } catch (error) {
        setErrorMsg("An error occurred while fetching location");
        console.error(error);
      }
    })();
  }, []);

  if (errorMsg) {
    return (
      <View>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="relative h-full mt-5 animate-bounce">
        <Image source={images.parkingkaP} style={{ height: 500, width: 300 }} />
        <View className="absolute top-[320px] left-12 pt-2 gap-3">
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "Jakarta-Bold", color: "#fff", fontSize: 32 }}>Find </Text>
            <Text style={{ fontFamily: "Jakarta-Bold", color: "#FFD700", fontSize: 32 }}>Free</Text>
          </View>
          <Text style={{ fontFamily: "Jakarta-Bold", color: "#fff", fontSize: 32 }}>Street Parking</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ fontFamily: "Jakarta-Bold", color: "#fff", fontSize: 32 }}>with </Text>
            <Text style={{ fontFamily: "Jakarta-Bold", color: "#FFD700", fontSize: 32 }}>Parkease</Text>
          </View>
        </View>
        <View style={{ position: "absolute", bottom: 24, width: "100%", alignItems: "center" }}>
          <View style={{ width: "80%", justifyContent: "center" }}>
            <CustomButton
              title="Start searching"
              bgVariant="main"
              textVariant="primary"
              onPress={handlePress}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
