// MainTabNavigator — 5 tab sesuai desain HTML I-REOC
// Tab: Beranda | Sensor | Riwayat | Panduan | Profil
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/main/DashboardScreen';
import SensorScreen from '../screens/main/SensorScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import GuideBookScreen from '../screens/main/GuideBookScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { ROUTES, COLORS, FONTS } from '../constants';

const Tab = createBottomTabNavigator();

// Icon mapping → Ionicons (padanan dari Material Symbols di HTML)
const TAB_ICONS = {
  [ROUTES.DASHBOARD]: { active: 'home', inactive: 'home-outline' },
  [ROUTES.SENSOR]:    { active: 'bar-chart', inactive: 'bar-chart-outline' },
  [ROUTES.HISTORY]:   { active: 'time', inactive: 'time-outline' },
  [ROUTES.GUIDE]:     { active: 'book', inactive: 'book-outline' },
  [ROUTES.PROFILE]:   { active: 'person', inactive: 'person-outline' },
};

const MainTabNavigator = () => {
  // Tinggi tab bar harus memperhitungkan area tombol navigasi Android (edge-to-edge),
  // jika tidak, tab bar tertimpa tombol sistem.
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(insets.bottom, 10);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          height: 54 + paddingBottom,
          paddingBottom,
          paddingTop: 6,
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.outline,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontFamily: FONTS.headingSemiBold,
        },
        tabBarIcon: ({ focused, color }) => {
          const icons = TAB_ICONS[route.name] || { active: 'ellipse', inactive: 'ellipse-outline' };
          return <Ionicons name={focused ? icons.active : icons.inactive} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name={ROUTES.DASHBOARD} component={DashboardScreen} options={{ title: 'Beranda' }} />
      <Tab.Screen name={ROUTES.SENSOR}    component={SensorScreen}    options={{ title: 'Sensor' }} />
      <Tab.Screen name={ROUTES.HISTORY}   component={HistoryScreen}   options={{ title: 'Riwayat' }} />
      <Tab.Screen name={ROUTES.GUIDE}     component={GuideBookScreen} options={{ title: 'Panduan' }} />
      <Tab.Screen name={ROUTES.PROFILE}   component={ProfileScreen}   options={{ title: 'Profil' }} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;