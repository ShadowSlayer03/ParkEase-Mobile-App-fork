import { Tabs } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { tablist, svgs } from '../../constants/tabConstants';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: true, // Ensure label is displayed
        tabBarIndicatorStyle: {
          height: 4,
          position: 'absolute',
          top: 0,
        },
        tabBarStyle: {
          height: 60,
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        
      }}
    >
      {tablist.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => svgs[item.name](focused),
            tabBarLabel: ({focused}) => (
              <Text className={`${focused?"text-black ":"text-gray-400 "} font-JakartaBold `}>
                  {item.title}
                </Text>
            ),
            
          }}
        />
      ))}
    </Tabs>
  );
}
