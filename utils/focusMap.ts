import * as Location from "expo-location";
import { RefObject } from "react";
import MapView from "react-native-maps";

const focusMap = async (mapRef: RefObject<MapView>) => {
  try {
    const location = await Location.getCurrentPositionAsync({});

    const MyLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef?.current?.animateToRegion(MyLocation, 1000);
  } catch (error) {
    console.error("Error in focusMap:", error);
  }
};

export default focusMap;
