// AppNavigator — stack utama (tab + stack screens)
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import NotificationScreen from '../screens/main/NotificationScreen';
import SettingsScreen from '../screens/main/SettingsScreen';
import BatchDetailScreen from '../screens/main/BatchDetailScreen';
import { ROUTES, COLORS } from '../constants';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // TODO: sesuaikan header style dengan desain Anda
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.primary,
        headerTitleStyle: { fontWeight: 'bold', color: COLORS.onSurface },
        headerShadowVisible: false,
      }}
    >
      {/* Tab utama */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabNavigator}
        options={{ headerShown: false }}
      />

      {/* Stack screens yang bisa dibuka dari tab mana saja */}
      <Stack.Screen
        name={ROUTES.BATCH_DETAIL}
        component={BatchDetailScreen}
        options={{ title: 'Detail Batch' }}
      />
      <Stack.Screen
        name={ROUTES.NOTIFICATION}
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SETTINGS}
        component={SettingsScreen}
        options={{ title: 'Pengaturan' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
