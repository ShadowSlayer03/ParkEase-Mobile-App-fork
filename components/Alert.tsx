import { alertStore } from '@/store/alertStore';
import { useEffect } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Animated, { SlideInLeft, FadeOut } from 'react-native-reanimated';

const AlertBanner = () => {
  const { showAlert, message, statusCode, clearAll } = alertStore();

  const closeBanner = () => {
    clearAll();
  };

  useEffect(()=>{
    const timer = setTimeout(() => {
        clearAll();
    }, 3000);

    return() =>  clearTimeout(timer);
  })

  console.log("Alert:", showAlert, message, statusCode);

  if (!showAlert) return null;

  return (
    <Animated.View 
      entering={SlideInLeft.springify()}  // Slide in when alert appears
      exiting={FadeOut.duration(300)}    // Fade out when alert is dismissed
      className="absolute w-full bg-primary-500 z-50 top-10 flex-row items-center justify-between"
    >
      <Text className="font-bold text-white">
        {statusCode}: {message}
      </Text>
      <TouchableOpacity onPress={closeBanner} className="m-4 p-4 bg-red-500">
        <Text className="text-white">X</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AlertBanner;
