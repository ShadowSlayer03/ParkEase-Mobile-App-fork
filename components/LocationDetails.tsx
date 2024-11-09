import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CustomButton from './CustomButton';
import NavigationArrow from './NavigationArrow';
import { TouchableOpacity } from 'react-native';
import { destStore } from '@/store/useStore';

import * as Linking from 'expo-linking'
import { userStore } from '@/store/userLocationStore';
import Animated, { SlideInDown, SlideInUp, SlideOutDown, useSharedValue } from 'react-native-reanimated';

const LocationDetails = () => {
    const {destDetails, clearDest} = destStore();
    const {userLocation, setNavigationStatus} = userStore();

    const offset = useSharedValue(0)

    const navigateToDest = ()=>{
        setNavigationStatus(true);
    }

    const locationDeatils = {
        name:"NIE-Admin Block",
        location:"Manandvadi road, NIE",
        list_details:{
            distance:2100,spots_left:2,no_of_slots:20,filled:18
        }
    }
    return (
        <Animated.View
        entering={SlideInDown.springify()}
        className="relative px-2 bg-primary-300 rounded-t-2xl">
                    <View className="top-2 absolute z-20 w-full flex p-1 items-end justify-end">
                    <TouchableOpacity onPress={()=>{clearDest()}}>
                            <Svg fill="none" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1.5} stroke="#57595d">
                                <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </Svg>
                    </TouchableOpacity>
                    </View>
                    <View className="mt-5">
                        <Text className="text-xl font-JakartaBold">
                            {destDetails.name}
                        </Text>
                        <Text className="text-base font-JakartaExtraLight">
                            {destDetails.location}
                        </Text>
                    </View>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View className="flex flex-row gap-3 py-4">
                        <Text className="text-base font-JakartaMedium py-1 px-2 rounded-full bg-primary-200">
                            {locationDeatils.list_details.distance/1000} km
                        </Text>
                        <Text className="font-JakartaMedium text-base py-1 px-2 rounded-full bg-primary-200">
                            {locationDeatils.list_details.no_of_slots} spots present
                        </Text>
                        <Text className="font-JakartaMedium text-base py-1 px-2 rounded-full bg-primary-200">
                            {locationDeatils.list_details.filled} spots filled
                        </Text>
                        <Text className="font-JakartaMedium text-base py-1 px-2 rounded-full bg-primary-200">
                            {locationDeatils.list_details.spots_left} spots available
                        </Text>
                    </View>
                    </ScrollView>
                    <View className="mx-2 mb-8">
                        <CustomButton 
                        bgVariant="dark"
                        title="Navigate"
                        onPress={navigateToDest}
                        IconLeft={() => <NavigationArrow />}
                        />
                    </View>
                    <View className="Extra h-32"></View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({})

export default LocationDetails;
