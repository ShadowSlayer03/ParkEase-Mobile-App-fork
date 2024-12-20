import React from 'react'
import { Tabs } from 'expo-router'

const RootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{headerShown:false}}/>
      <Tabs.Screen name="Parking" />
    </Tabs>
  )
}

export default RootLayout