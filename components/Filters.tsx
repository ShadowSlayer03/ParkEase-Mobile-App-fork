import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import {filterOptions, fliterOptions} from "../constants/dummy_data"

const Filters = () => {
    const [isEnabled, setIsEnabld] = useState(false);

    const toggleSwitch = ()=>{
        setIsEnabld(previousState=> !previousState);
    }
    return (
        <View className="flex flex-col bg-primary-700 rounded-t-2xl">
            <View className="flex justify-center items-center">
                <Text className="bg-[#575757] rounded-full h-2 w-12 m-2"></Text>
            </View>
            <View>
               <Text className="font-JakartaBold text-white text-center">Fliters</Text> 
            </View>
            <Text className="w-screen border-t h-1 border-primary-500"></Text>
            <View className="flex flex-row justify-between">
                <Text className="font-JakartaLight my-2 text-white">Show only free parking spots</Text>
                <Switch
                    className=""
                    trackColor={{true: '#b59801', false:"#000"}}
                    thumbColor={"#FFD602"}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View>
                <Text className="text-white">Select the parking type</Text>
                <View>
                </View>
            </View>
            <View>
                <Text className="text-white">Select additonal options</Text>
                <View className="w-full flex gap-2 flex-wrap flex-row">
                    {filterOptions.map((item)=>{
                       return <TouchableOpacity onPress={()=>""}><Text className="px-2 py-1 mx-1 text-white border border-primary-300 rounded-full bg-primary-600">{item}</Text></TouchableOpacity>
                    })}
                </View>
            </View>
            <View></View>
            <View></View>
        </View>
    );
}

export default Filters;