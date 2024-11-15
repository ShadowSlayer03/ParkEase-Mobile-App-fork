import { markers } from '@/assets/parkingareas/markers';
import Filters from '@/components/Filters';
import GoogleTextInput from '@/components/GoogleTextInput';
import LocationDetails from '@/components/LocationDetails';
import App from '@/components/MapParking';
import { destStore } from '@/store/destStore';
import { useUser } from '@clerk/clerk-expo';
import { router, useNavigation } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import { Path, Svg } from 'react-native-svg';

const Map = () => {
    const { showDestDetails, setShowDestDetails, setDest } = destStore();
    const [showFilter, setShowFilter] = useState(false);
    const [googleSearch, setGooglesearch] = useState(false);

    const [showList, setShowList] = useState(false);
    const navigate = useNavigation().navigate;

    const { isSignedIn } = useUser();
    if (!isSignedIn) {
        navigate('(auth)');
    }

    const handleSearch = ()=>{
        setShowFilter(false);
        setShowDestDetails(false);
        setGooglesearch(true);
    }
    const handleFilter = ()=>{
        setShowFilter(true);
        setShowDestDetails(false);
        setGooglesearch(false);
    }
    const list  = ["GjB, NIE", "Admin Block, NIE"]

    const handleList = ()=>{
        setShowFilter(false);
        setShowDestDetails(false);
        setGooglesearch(false);
        setShowList(!showList);
    }
    const handleListItemClick = (ind)=>{
        setDest(markers[ind]);
        setShowFilter(false);
        console.log("cliked")
        setShowList(false);
    }

    // Handle the back button press
    useEffect(() => {
        const backAction = () => {
            // You can modify this logic based on your app's needs.
            if (showFilter) {
                setShowFilter(false);
                return true; // Prevent default back action
            } else if (googleSearch) {
                setGooglesearch(false);
                return true; // Prevent default back action
            } else {
                // You can either navigate to another screen or exit the app
                Alert.alert('Hold on!', 'Are you sure you want to exit?', [
                    {
                        text: 'Cancel',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'YES',
                        onPress: () => BackHandler.exitApp(),
                    },
                ]);
                return true; // Prevent default back action
            }
        };

        BackHandler.addEventListener('hardwareBackPress', backAction);

        // Cleanup the listener on unmount
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, [showFilter, googleSearch]);

    return (
        <View className="relative h-full bg-black">
            <App />
            {/* Top bar - list of the parking lots */}
            <View className="absolute w-screen mt-12">
                <View className="flex items-center mx-4">
                    {googleSearch ? (
                        <GoogleTextInput
                            initialLocation={"Search Parking slots by places"}
                            containerStyle={"  "}
                            handlePress={() => {
                                setGooglesearch(false);
                            }}
                        />
                    ) : (
                        <View className="rounded-2xl w-full bg-black flex flex-row justify-between px-2 py-4">
                            <View className="bg-primary-700 rounded-full flex flex-row justify-between items-center">
                                <View className="h-9 w-9 flex justify-center items-center bg-primary-300 rounded-full">
                                    <Text className="text-xl text-black">6</Text>
                                </View>
                                
                                    <View className="px-2 flex justify-center items-center">
                                        <Text className="text-center text-base text-white">Free parking lots nearby</Text>
                                    </View>
                            </View>
                            <View className="relative flex flex-row px-2 rounded-full">
                                <TouchableOpacity 
                                onPress={handleList}
                                className="flex flex-row justify-around bg-primary-500 px-2 items-center rounded-full">
                                    <Svg width={20} height={20} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white">
                                        <Path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                                        />
                                    </Svg>
                                    <Text className="text-base text-white px-2">List</Text>
                                </TouchableOpacity>
                                {showList &&<View className="absolute z-40 top-10 right-0 rounded-sm">
                                    {markers.map((item,ind)=>{
                                        return (
                                            <TouchableOpacity className="m-[1px] bg-primary-500 rounded-sm" key={ind} onPress={()=>handleListItemClick(ind)}>
                                                <Text className="p-2 text-white">{item?.name}</Text>
                                                <Text className="w-full h-[1px] border-b border-primary-500"></Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>}
                            </View>
                        </View>
                    )}
                </View>
                {/* search icon */}
                <View className="flex relative">
                    <View className="absolute right-5 top-5 z-20 flex gap-4">
                        <View className="bg-[#bdc2c9] p-3 rounded-full">
                        <TouchableOpacity onPress={ handleSearch }>
                            <Svg height={24} width={24} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black">
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </Svg>
                        </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={handleFilter} className="bg-[#bdc2c9] p-3 rounded-full">
                            <Svg height={24} width={24} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black">
                                <Path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                            </Svg>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View className="absolute -bottom-32 w-screen overflow-hidden">
                {showDestDetails && <LocationDetails />}
            </View>
            <View className="z-40 absolute bottom-0 w-screen">
                {showFilter && <Filters setShowFilter={setShowFilter} />}
            </View>
        </View>
    );
}

export default Map;
