import { useFonts } from "expo-font";
import { Link, SplashScreen, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

import * as Location from 'expo-location';
import { userStore } from "@/store/userLocationStore";
import CustomButton from "@/components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";

export default function Index() {
  const [errorMsg, setErrorMsg] = useState('');
  const {setUserLocation} = userStore();
  const {user} = useUser();
  const navigate = useNavigation().navigate;

  const handlePress = ()=>{
    if(!user){
      navigate('(auth)');
    }
    else{
      navigate('(screens)');
    }
  }

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
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords)
    })();
  }, []);

  if (!loaded) {
    return null;
  }
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="relative h-full mt-5 animate-bounce">
        <Image source={images.parkingkaP} className="h-[500px] w-[300px]" />
        <View className="absolute top-[320px] left-12 pt-2 gap-3">
          <View className="flex flex-row">
            <Text className="font-JakartaBold text-primary-100 text-4xl">Find </Text>
            <Text className="font-JakartaBold text-primary-300 text-4xl">Free</Text>
          </View>
          <Text className="font-JakartaBold text-primary-100 text-4xl">Street Parking</Text>
          <View className="flex flex-row">
            <Text className="font-JakartaBold text-primary-100 text-4xl">with </Text>
            <Text className="font-JakartaBold text-primary-300 text-4xl">Parkease</Text>
          </View>
        </View>
        <View className="absolute bottom-24 flex w-full items-center">
        <View className="w-4/5 flex justify-center">
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
