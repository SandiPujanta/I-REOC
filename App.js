import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  InstrumentSans_400Regular,
  InstrumentSans_500Medium,
  InstrumentSans_600SemiBold,
  InstrumentSans_700Bold,
} from '@expo-google-fonts/instrument-sans';
import {
  RedHatText_300Light,
  RedHatText_400Regular,
  RedHatText_500Medium,
  RedHatText_600SemiBold,
  RedHatText_700Bold,
} from '@expo-google-fonts/red-hat-text';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    InstrumentSans_400Regular,
    InstrumentSans_500Medium,
    InstrumentSans_600SemiBold,
    InstrumentSans_700Bold,
    RedHatText_300Light,
    RedHatText_400Regular,
    RedHatText_500Medium,
    RedHatText_600SemiBold,
    RedHatText_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
