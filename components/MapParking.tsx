import React, { useEffect, useRef } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import * as Location from 'expo-location';
import { markers } from '@/assets/parkingareas/markers';
import { destStore } from '@/store/useStore';
import { useStore } from 'zustand';
import { images } from '@/constants';

export default function App() {
    const mapref = useRef();
    const { destDetails, setDest } = destStore();

    const onMarkerSelected = (area) => {
        setDest(area);
        console.log("hii",destDetails);
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
        latitudeDelta:0.2 ,
        longitudeDelta:0.2,
    }

  return (
    <View className="relative h-full">
      <MapView className="h-full " 
      style={styles.map}
      customMapStyle={mapStyle}
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
                    coordinate={{
                        latitude: area.latitude,
                        longitude: area.longitude,
                    }}
                    onPress={()=> onMarkerSelected(area)}
                >
                  <View className="">
                      <Image 
                          source={images.marker_icon} 
                          className="w-10 h-10 rounded-full" 
                      />
                  </View>
                </Marker>
            )
        })}
      </MapView>  
      <TouchableOpacity className="absolute z-20 bottom-1/3 right-5" onPress={focusMap}>
        <Svg width={30} height={30} fill="#f3f3f3" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3f3f3f" className="size-6">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      { color: "#1e1e1e" } // Dark background color
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      { visibility: "off" } // Hide icons
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      { color: "#525252" } // Dim gray for text labels
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      { color: "#1e1e1e" } // Match background color for minimal text visibility
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      { color: "#525252" } // Slightly visible borders
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      { visibility: "off" } // Hide POI labels
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      { color: "#191919" } // Darker shade for parks
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { color: "#2c2c2c" } // Dark gray for roads
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { color: "#2b2b2b" } // Slightly lighter for arterial roads
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      { color: "#333333" } // A bit lighter for highways
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      { color: "#282828" } // Slightly darker for local roads
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      { color: "#1a1a1a" } // Dark transit lines
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      { color: "#0e0e0e" } // Very dark color for water
    ],
  }
];