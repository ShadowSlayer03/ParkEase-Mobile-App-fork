import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import CustomButton from './CustomButton';
import NavigationArrow from './NavigationArrow';
import { TouchableOpacity } from 'react-native';

const LocationDetails = ({setDetailsOfLocation}) => {
    const locationDeatils = {
        name:"NIE-Admin Block",
        location:"Manandvadi road, NIE",
        list_details:{
            distance:2100,spots_left:2,no_of_slots:20,filled:18
        }
    }
    return (
        <View className="relative px-2 bg-primary-300 rounded-t-2xl">
                    <TouchableOpacity onPress={()=>{setDetailsOfLocation(false);}}>
                    <View className="top-2 absolute z-20 w-full flex p-1 items-end justify-end">
                            <Svg fill="none" width={24} height={24} viewBox="0 0 24 24" strokeWidth={1.5} stroke="#57595d">
                                <Path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </Svg>
                    </View>
                    </TouchableOpacity>
                    <View className="mt-5">
                        <Text className="text-xl font-JakartaBold">
                            {locationDeatils.name}
                        </Text>
                        <Text className="text-base font-JakartaExtraLight">
                            {locationDeatils.location}
                        </Text>
                    </View>
                    <View className="flex flex-row gap-3 py-4 overflow-x-scroll">
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
                    <View className="mx-2 mb-8">
                        <CustomButton 
                        bgVariant="dark"
                        title="Navigate"
                        IconLeft={() => <NavigationArrow />}
                        />
                    </View>
                </View>
    );
}

const styles = StyleSheet.create({})

export default LocationDetails;
