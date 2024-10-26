import { View, Text, Image } from 'react-native'
import React from 'react'
import Car from '@/components/Car'
import { images } from '@/constants'

const Parking = () => {
  return (
    <View className="bg-white h-screen">
      <Text className="text-3xl font-JakartaExtraBold my-5">
        Car Parking
      </Text>
      <View className="relative">
        <View className="absolute top-9 left-3 z-10 w-32 h-24 transform rotate-[30deg]">
          <Car color={"red"} />
        </View>
        <View className="absolute top-28 left-3 z-10 w-32 h-24 transform rotate-[30deg]">
          <Car color={"blue"} />
        </View>
        <View className="absolute top-44 left-3 z-10 w-32 h-24 transform rotate-[30deg]">
          <Car color={"pink"} />
        </View>
        <Image className="bg-red-600 h-[600px] w-[170px]" source={images.parking_layout1} />
      </View>
    </View>
  )
}

export default Parking