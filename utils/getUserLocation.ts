import * as Location from 'expo-location';

export const getUserLocation = async () => {
  try {
    // Request permission to access location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      throw new Error('Permission to access location was denied');
    }

    // Get current position
    const locationData = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return locationData.coords;
  } catch (err) {
    throw new Error('Error getting location: ' + err);
  }
};
