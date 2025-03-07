import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps"; // Import Region type
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import { icons } from "@/constants";
import { destStore } from "@/store/destStore";
import destTypes from "@/types/destTypes";
import AlertBanner from "./Alert";
import { alertStore } from "@/store/alertStore";
import { useRouter } from "expo-router";
import useLocationAndProximity from "@/hooks/useLocationAndProximity";
import focusMap from "@/utils/focusMap";
import TransformedData from "@/types/transformedData";

interface AppProps {
  markers: TransformedData[] | null;
}

export default function App({ markers }: AppProps) {
  const mapRef = useRef<MapView>(null);
  const { destDetails, setDest, navigationStatus, showDestDetails } = destStore();
  const { showAlert, setShowAlert, setStatusCode, setMsg } = alertStore();
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const EXPO_PUBLIC_GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

  useEffect(() => {
    if (markers) console.log("Markers are loaded successfully!");
  }, [markers]);

  useEffect(() => {
    if (!EXPO_PUBLIC_GOOGLE_API_KEY) {
      setShowAlert();
      setStatusCode(400);
      setMsg("Google API Key Not Found!");
    }
  }, [EXPO_PUBLIC_GOOGLE_API_KEY]);

  useEffect(() => {
    const getLocationPermissions = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setShowAlert();
          setStatusCode(401);
          setMsg("Location Permission Denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error while requesting location permissions:", error);
        setShowAlert();
        setStatusCode(500);
        setMsg("Failed to request location permissions");
      }
    };

    getLocationPermissions();
  }, []);

  const onMarkerSelected = (area: destTypes) => {
    setDest(area);
  };

  const { userLocation, heading } = useLocationAndProximity({
    destination: destDetails,
    onProximity: () => {
      console.log("You have reached the destination!");
      router.push("(parking)");
      return;
    },
  });

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <View className="relative h-full">
      <MapView
        className="h-full"
        style={styles.map}
        customMapStyle={mapStyle}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsMyLocationButton={false}
        showsUserLocation={true}
        zoomControlEnabled={true}
        zoomEnabled={true}
        ref={mapRef}
        moveOnMarkerPress={false}
        showsCompass={true}
        showsPointsOfInterest={false}
      >
        {markers?.map((area, ind) => {
          return (
            <View key={ind}>
              <Marker
                coordinate={{
                  latitude: area.latitude,
                  longitude: area.longitude,
                }}
                onPress={() => onMarkerSelected(area)}
              >
                <View>
                  <Image
                    source={icons.marker_icon}
                    className="w-9 h-9 rounded-full"
                  />
                </View>
              </Marker>
            </View>
          );
        })}
        {userLocation && destDetails && navigationStatus && (
          <MapViewDirections
            origin={userLocation}
            destination={destDetails}
            apikey={EXPO_PUBLIC_GOOGLE_API_KEY}
            strokeWidth={2}
            strokeColor="rgba(255, 214, 2, 0.8)"
          />
        )}
      </MapView>
      <TouchableOpacity
        className="absolute z-20 bottom-32 right-5"
        onPress={() => focusMap(mapRef)}
      >
        <Image className="h-6 w-6" source={icons.my_location_icon} />
      </TouchableOpacity>
      {showAlert && <AlertBanner />}
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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [{ color: "#1e1e1e" }],
  },
  {
    elementType: "labels.icon",
    stylers: [{ visibility: "on" }],
  },
  {
    elementType: "labels.text.fill",
    stylers: [{ color: "#525252" }],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1e1e1e" }],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#525252" }],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#191919" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ visibility: "simplified" }, { color: "#2c2c2c" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#2b2b2b" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#333333" }],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [{ color: "#282828" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1a1a1a" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#0e0e0e" }],
  },
];