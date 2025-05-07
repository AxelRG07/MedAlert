import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReminderList from '../views/ReminderList';
import ReminderForm from '../views/ReminderForm';
import ReminderDetail from '../views/ReminderDetail';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ReminderList">
      <Stack.Screen name="ReminderList" component={ReminderList} />
      <Stack.Screen name="ReminderForm" component={ReminderForm} />
      <Stack.Screen name="ReminderDetail" component={ReminderDetail} />
    </Stack.Navigator>
  );
}
