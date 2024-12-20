import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInLeft, FadeOut } from "react-native-reanimated";
import { alertStore } from "@/store/alertStore";
import { LinearGradient } from "expo-linear-gradient";

const AlertBanner = () => {
  const { showAlert, message, statusCode, clearAll } = alertStore();

  const closeBanner = () => {
    clearAll();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clearAll();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!showAlert) return null;

  return (
    statusCode && <Animated.View
      entering={SlideInLeft.springify()}
      exiting={FadeOut.duration(300)}
      className="absolute top-5 left-4 right-4 z-50 shadow-lg rounded-lg overflow-hidden"
    >
      <LinearGradient
        colors={["#FFD602", "#FFC300"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 10,
          borderRadius: 8,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: statusCode >= 400 ? "#FF0000" : "#00D26A",
              marginRight: 10,
            }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#000000",
              fontFamily: "Funnel-Sans-Medium",
            }}
          >
            {statusCode}: {message}
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

export default AlertBanner;
