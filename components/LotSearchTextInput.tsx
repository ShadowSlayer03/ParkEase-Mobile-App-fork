import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { Image } from "expo-image";
import { icons } from "@/constants";
import axios from "axios";
import { debounce } from "lodash";
import ParkingLot from "@/types/ParkingSlot";

interface SlotSearchTextInputProps {
  icon?: any;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: () => void;
  onSelectLot: (slot: ParkingLot) => void;
}

const cache: { [key: string]: any } = {};

const SlotSearchTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
  onSelectLot,
}: SlotSearchTextInputProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ParkingLot[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetchParkingSlots = useCallback(
    debounce(async (query: string) => {
      if (cache[query]) {
        setSearchResults(cache[query]);
        setIsLoading(false);
        return;
      }

      try {
        const backendURL = process.env.EXPO_PUBLIC_BACKEND_URL;
        if (!backendURL) {
          console.error("Backend URL not found in .env");
          return;
        }

        const response = await axios.get(
          `${backendURL}/api/search-parking-slots`,
          {
            params: { query },
          }
        );

        cache[query] = response.data;
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching parking slots:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Handle text input changes
  const handleTextChange = (text: string) => {
    setSearchQuery(text);
    if (text.length > 2) {
      setIsLoading(true);
      debouncedFetchParkingSlots(text);
    } else {
      setSearchResults([]);
    }
  };

  // Handle selection of a parking slot
  const handleSlotSelection = (slot: ParkingLot) => {
    console.log("Parking lot selected:", slot.name);
    onSelectLot(slot);
    setSearchQuery(slot.name);
    setSearchResults([]);
  };

  return (
    <View
      className={`flex-1 bg-primary-500 rounded-full items-center justify-center z-50 ${containerStyle}`}
    >
      <View className="flex-row items-center w-full">
        {/* Left Icon */}
        <View className="justify-center items-center px-4">
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={icon ? icon : icons.close}
              className="w-4 h-4"
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Text Input */}
        <TextInput
          className="flex-1 h-12 text-white text-base font-FunnelDisplay"
          placeholder={initialLocation ?? "Search parking slots by name"}
          placeholderTextColor="grey"
          value={searchQuery}
          onChangeText={handleTextChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            backgroundColor: "transparent",
            borderRadius: 25,
            paddingHorizontal: 20,
          }}
        />
      </View>

      {/* Search Results Dropdown */}
      {isFocused && (searchResults.length > 0 || isLoading) && (
        <View
          className="absolute top-14 left-0 right-0 bg-white rounded-lg shadow-lg z-50"
          style={{ maxHeight: 200 }}
        >
          {isLoading ? (
            <View className="p-3 justify-center items-center">
              <ActivityIndicator size="small" color="#000" />
            </View>
          ) : (
              <FlatList
                keyboardShouldPersistTaps="handled"
                data={searchResults}
                keyExtractor={(item) => item?.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="p-3 border-b border-gray-200"
                    style={{ minHeight: 44 }}
                    hitSlop={{ top: 8, bottom: 8, left: 16, right: 16 }}
                    onPress={() => handleSlotSelection(item)}
                  >
                    <Text className="text-base font-FunnelDisplayMedium">
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
          )}
        </View>
      )}
    </View>
  );
};

export default SlotSearchTextInput;
