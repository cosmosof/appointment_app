import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CalendarScreen from '../screens/CalendarScreen';
import AddAppointmentScreen from '../screens/AddAppointmentScreen';
import UpdateAppointmentScreen from '../screens/UpdateAppointmentScreen';


const CalendarStack = createStackNavigator({
  Calendar: CalendarScreen,
  UpdateAppointment: UpdateAppointmentScreen
});

CalendarStack.navigationOptions = {
  tabBarLabel: 'Calendar',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-calendar' : 'md-calendar'}
    />
  ),
};

const AppointmentStack = createStackNavigator({
  Appointment: AddAppointmentScreen,
});

AppointmentStack.navigationOptions = {
  tabBarLabel: 'Add New',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
    />
  ),
};

export default createBottomTabNavigator({
  CalendarStack,
  AppointmentStack,
});
