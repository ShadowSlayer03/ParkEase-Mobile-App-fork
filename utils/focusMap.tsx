import { alertStore } from "@/store/alertStore";
import * as Location from "expo-location";
import { RefObject } from "react";
import MapView from "react-native-maps";

const focusMap = async (mapRef: RefObject<MapView>) => {
  const { setShowAlert, setStatusCode, setMsg } = alertStore();
  
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") {
    setShowAlert();
    setStatusCode(401);
    setMsg("Location Permission Denied");
    return;
  }
  
  const location = await Location.getCurrentPositionAsync({});
  const MyLocation = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  mapRef?.current?.animateToRegion(MyLocation, 1000);
};

export default focusMap;
