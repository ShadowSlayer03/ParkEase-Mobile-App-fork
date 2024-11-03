import React, { useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import * as Location from 'expo-location';
import { markers } from '@/assets/parkingareas/markers';

export default function App() {
    const mapref = useRef();

    const onMarkerSelected = (area: any) => {
		Alert.alert(area.name);
	};

    const focusMap =async () => {
        let location = await Location.getCurrentPositionAsync({});

        const MyLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        };

		mapref.current?.animateToRegion(MyLocation);

		// Or change the camera with a duration
		// mapRef.current?.animateCamera({ center: GreenBayStadium, zoom: 10 }, { duration: 2000 });
	};

    const INITIAL_REGION = {
        latitude:12.2958,
        longitude:76.6394,
        latitudeDelta:2 ,
        longitudeDelta:2,
    }

  return (
    <View className="relative h-full">
      <MapView className="h-full w-screen" 
      provider={PROVIDER_GOOGLE} 
      initialRegion={INITIAL_REGION}
      showsUserLocation
      showsMyLocationButton={false}
      ref={mapref}
      >
        {markers.map((area, ind)=>{
            console.log(markers)
            return(
                <Marker 
                    key={ind}
                    title={area.name}
                    coordinate={{
                        latitude: area.latitude,
                        longitude: area.longitude,
                    }}
                    onPress={()=> onMarkerSelected(area)}
                >
                </Marker>
            )
        })}
      </MapView>  
      <TouchableOpacity className="absolute z-20 bottom-1/3 right-5" onPress={focusMap}>
        <Svg width={30} height={30} fill="#313131" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#070707" className="size-6">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}
