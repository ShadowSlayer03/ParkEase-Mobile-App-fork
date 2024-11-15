import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { GoogleInputProps } from "@/types/type";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { icons } from "@/constants";

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {

  return (
    <View
      className={`flex-1 bg-primary-500 rounded-full items-center justify-center ${containerStyle}`} // Ensure full flexbox layout
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        debounce={200}
        styles={{
          textInputContainer: {
            alignSelf: "center", // Align the input in the center of its parent
            borderRadius: 20,
          },
          textInput: {
            backgroundColor: "transparent",
            fontSize: 16,
            fontWeight: "600",
            height: 50,
            borderRadius: 25,
            paddingHorizontal: 20,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || "#ffffff",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: "en",
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center px-4">
              <TouchableOpacity
                onPress={handlePress}
              >
              <Image
                source={icon ? icon : icons.close}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "grey",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
