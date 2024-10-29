import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import CustomButton from '@/components/CustomButton'

const Profile = () => {
  return (
    <View className="h-screen relative bg-black">
      <Image source={images.parkingkaP} className="h-[500px] w-[300px]"/>
      <View className="absolute top-[300px] left-16 pt-4 gap-3">
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
      <View className="absolute">
        <CustomButton 
        title="Start searching" 
        bgVariant="main"
        />
      </View>
    </View>
  )
}

export default Profile