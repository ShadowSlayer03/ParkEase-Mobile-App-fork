import { View, Text, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="relative h-full mt-5 animate-bounce">
        <Image source={images.parkingkaP} className="h-[500px] w-[300px]" />
        <View className="absolute top-[320px] left-12 pt-2 gap-3">
          <View className="flex flex-row">
            <Text className="font-JakartaBold text-primary-100 text-5xl">Find </Text>
            <Text className="font-JakartaBold text-primary-300 text-5xl">Free</Text>
          </View>
          <Text className="font-JakartaBold text-primary-100 text-5xl">Street Parking</Text>
          <View className="flex flex-row">
            <Text className="font-JakartaBold text-primary-100 text-5xl">with </Text>
            <Text className="font-JakartaBold text-primary-300 text-5xl">Parkease</Text>
          </View>
        </View>
        <View className="absolute bottom-24 flex w-full items-center">
        <View className="w-4/5 flex justify-center">
          <CustomButton 
            title="Start searching" 
            bgVariant="main"
            textVariant="primary"
          />
            </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
