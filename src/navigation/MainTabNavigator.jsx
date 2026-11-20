// MainTabNavigator — 5 tab sesuai desain HTML I-REOC
// Tab: Beranda | Sensor | Riwayat | Panduan | Profil
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DashboardScreen from '../screens/main/DashboardScreen';
import SensorScreen from '../screens/main/SensorScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import GuideBookScreen from '../screens/main/GuideBookScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { ROUTES, COLORS } from '../constants';

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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          // TODO: sesuaikan style tab bar sesuai desain Anda
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
          backgroundColor: COLORS.surface,
          borderTopColor: COLORS.outline,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarIcon: ({ focused, color, size }) => {
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
