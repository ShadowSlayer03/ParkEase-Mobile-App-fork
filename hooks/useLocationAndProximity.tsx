// import { useEffect, useRef, useState } from "react";
// import * as Location from "expo-location";
// import calculateDistance from "@/utils/calculateDistance";
// import destTypes from "@/types/destTypes";
// import { userLocationStore } from "@/store/userLocationStore";
// import { destStore } from "@/store/destStore";

// interface UseLocationAndProximityOptions {
//   destination?: destTypes | null;
//   onProximity?: () => void;
// }

// function useLocationAndProximity({
//   destination,
//   onProximity,
// }: UseLocationAndProximityOptions) {
//   const locationSubscription = useRef<Location.LocationSubscription | null>(
//     null
//   );
//   const headingSubscription = useRef<Location.LocationSubscription | null>(
//     null
//   );
//   const { userLocation, setUserLocation } = userLocationStore();
//   const { navigationStatus } = destStore();
//   const [heading, setHeading] = useState(0);

//   useEffect(() => {
//     const startTracking = async () => {
//       try {
//         const { status } = await Location.requestForegroundPermissionsAsync();
//         if (status !== "granted") {
//           console.error("Location permissions not granted");
//           return;
//         }

//         // Watch user location
//         locationSubscription.current = await Location.watchPositionAsync(
//           {
//             accuracy: Location.Accuracy.High,
//             distanceInterval: 2,
//             timeInterval: 3000,
//           },
//           (location) => {
//             setUserLocation(location.coords);

//             // Check proximity if a destination is provided
//             if (destination && onProximity) {
//               const distance = calculateDistance(
//                 location.coords.latitude,
//                 location.coords.longitude,
//                 destination.latitude,
//                 destination.longitude
//               );
//               // console.log("Distance to destination in metres:", distance);

//               if (distance <= 15) {
//                 onProximity();
//               }
//             }
//           }
//         );

//         // Watch user heading
//         headingSubscription.current = await Location.watchHeadingAsync(
//           ({ trueHeading }) => {
//             setHeading(trueHeading);
//           }
//         );
//       } catch (error) {
//         console.error("Error starting location tracking:", error);
//       }
//     };

//     if (navigationStatus === true) startTracking();

//     return () => {
//       locationSubscription.current?.remove();
//       headingSubscription.current?.remove();
//     };
//   }, [destination, onProximity]);

//   return { userLocation, heading };
// }

// export default useLocationAndProximity;


import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { userLocationStore } from "@/store/userLocationStore";
import { destStore } from "@/store/destStore";
import destTypes from "@/types/destTypes";

interface UseLocationAndProximityOptions {
  destination?: destTypes | null; // Destination name
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

  console.log("useLocationAndProximity called");

  const boundaries: Record<string, [number, number][]> = {
    "NIE Admin": [
      [12.283582199560623, 76.64153444198031],
      [12.28398865275799, 76.64175961942637],
      [12.28427249715797, 76.64140795830838],
      [12.283629451615901, 76.64106288036548],
    ],
    "GJB": [
      [12.281633509157041, 76.64071099139541],
      [12.28089871626085, 76.64042783001264],
      [12.281352292361422, 76.64107151927576],
      [12.280782298270891, 76.6410343833564],
    ],
    "Tru Lit Herbals": [
      [12.275966996524806, 76.64321126748949],
      [12.275952581685294, 76.643366165065],
      [12.275843159923264, 76.64319919754854],
      [12.275832676398762, 76.64334336628765]
    ]
  };

  const insidePolygon = (point: [number, number], polygon: [number, number][]) => {
    const [px, py] = point;
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const [xi, yi] = polygon[i];
      const [xj, yj] = polygon[j];

      const intersect =
        yi > py !== yj > py &&
        px < ((xj - xi) * (py - yi)) / (yj - yi) + xi;
      if (intersect) isInside = !isInside;
    }

    return isInside;
  };

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
            const { latitude, longitude } = location.coords;
            setUserLocation(location.coords);

            // Check if user is within the boundary of the destination
            if (destination && onProximity) {
              const boundary = boundaries[destination.name];
              if (boundary && insidePolygon([latitude, longitude], boundary)) {
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
