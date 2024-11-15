import { previousRides } from '@/assets/parkingareas/markers';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Activity = () => {
    return (
        <SafeAreaView>
            <View>
                <Text className="text-4xl font-JakartaBold p-5">Activity</Text>
            </View>
            <View>
                <View>
                    <Text>Past</Text>
                </View>
                <View>
                    {previousRides.map((item, ind)=>{
                        return(
                            <View key={ind} className="flex p-4 bg-primary-500 rounded-xl m-3">
                                <Text className="text-white">From: {item.origin}</Text>
                                <Text className="text-white">To: {item.destination}</Text>
                                <Text className="text-white">Date: {item.time}</Text>
                            </View>
                        )
                    })}
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Activity;