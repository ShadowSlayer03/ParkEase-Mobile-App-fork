import { Tabs } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { tablist, svgs } from '../../constants/tabConstants';
import { Text } from 'react-native';
import React from 'react';

export default function Layout() {
  const getTabBarLabel = (focused, title) => {
    return (
      <Text className={`${focused ? "text-black" : "text-gray-400"} font-JakartaBold`}>
        {title}
      </Text>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarIndicatorStyle: {
          height: 4,
          position: 'absolute',
          top: 0,
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
        },
      }}
    >
      {tablist.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            headerShown: false,
            lazy: true, // Only load tabs when accessed
            tabBarIcon: ({ focused }) => svgs[item.name](focused),
            tabBarLabel: ({ focused }) => getTabBarLabel(focused, item.title),
          }}
        />
      ))}
    </Tabs>
  );
}
