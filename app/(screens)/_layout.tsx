import React from "react";
import { Text } from "react-native";
import { Tabs } from "expo-router";
import { tablist, svgs } from "../../constants/tabConstants";

type TabName = "index" | "Profile" | "activity";

interface TabItem {
  name: TabName;
  title: string;
}

export default function Layout() {
  const typedTablist = tablist as TabItem[];

  const getTabBarLabel = (focused: boolean, title: string) => {
    return (
      <Text
        className={`${
          focused ? "text-black" : "text-gray-400"
        } font-FunnelDisplayBold`}
      >
        {title}
      </Text>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 60,
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          marginBottom: 2
        },
      }}
    >
      {typedTablist.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            headerShown: false,
            lazy: true, // Only load tabs when accessed
            tabBarIcon: ({ focused }) =>
              svgs[item.name as TabName](focused), // Type assertion
            tabBarLabel: ({ focused }) =>
              getTabBarLabel(focused, item.title),
          }}
        />
      ))}
    </Tabs>
  );
}
