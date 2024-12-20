import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import calculateDistance from "@/utils/calculateDistance";
import destTypes from "@/types/destTypes";
import { userLocationStore } from "@/store/userLocationStore";
import { destStore } from "@/store/destStore";

interface UseLocationAndProximityOptions {
  destination?: destTypes | null;
  onProximity?: () => void;
}

function useLocationAndProximity({
  destination,
  onProximity,
}: UseLocationAndProximityOptions) {
  const locationSubscription = useRef<Location.LocationSubscription | null>(
    null
  );
  const headingSubscription = useRef<Location.LocationSubscription | null>(
    null
  );
  const { userLocation, setUserLocation } = userLocationStore();
  const { navigationStatus } = destStore();
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const startTracking = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Location permissions not granted");
          return;
        }

        // Watch user location
        locationSubscription.current = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 2,
            timeInterval: 3000,
          },
          (location) => {
            setUserLocation(location.coords);

            // Check proximity if a destination is provided
            if (destination && onProximity) {
              const distance = calculateDistance(
                location.coords.latitude,
                location.coords.longitude,
                destination.latitude,
                destination.longitude
              );
              console.log("Distance to destination in metres:", distance);

              if (distance <= 15) {
                onProximity();
              }
            }
          }
        );

        // Watch user heading
        headingSubscription.current = await Location.watchHeadingAsync(
          ({ trueHeading }) => {
            setHeading(trueHeading);
          }
        );
      } catch (error) {
        console.error("Error starting location tracking:", error);
      }
    };

    if (navigationStatus === true) startTracking();

    return () => {
      locationSubscription.current?.remove();
      headingSubscription.current?.remove();
    };
  }, [destination, onProximity]);

  return { userLocation, heading };
}

export default useLocationAndProximity;
