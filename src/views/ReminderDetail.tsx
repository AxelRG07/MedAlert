import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Reminder } from '../models/ReminderModel';
import * as Storage from '../services/storage';
import * as Notifications from '../services/notificationService';

export default function ReminderDetail() {
  const { params } = useRoute<any>();
  const reminder: Reminder = params.reminder;
  const navigation = useNavigation<any>();

  const handleAttended = async () => {
    if (reminder.notificationId) {
      await Notifications.cancelNotification(reminder.notificationId);
    }
    await Storage.deleteReminder(reminder.id);
    navigation.goBack();
  };

  const handlePostpone = async () => {
    const newId = await Notifications.rescheduleNotification(reminder, 10);
    await Storage.updateReminder(reminder.id, { ...reminder, notificationId: newId });
    navigation.goBack();
  };

  const handleDismiss = async () => {
    const newId = await Notifications.rescheduleNotification(reminder, 5);
    await Storage.updateReminder(reminder.id, { ...reminder, notificationId: newId });
    navigation.goBack();
  };

  const handleDeactivate = async () => {
    if (reminder.notificationId) {
      await Notifications.cancelNotification(reminder.notificationId);
    }
    await Storage.updateReminder(reminder.id, { ...reminder, notificationId: undefined });
    navigation.goBack();
  };

  return (
    <View>
      <Text>{reminder.medication}</Text>
      <Text>Dosis: {reminder.dosage}</Text>
      <Text>Vía: {reminder.route}</Text>
      <Button title="Marcar como atendido" onPress={handleAttended} />
      <Button title="Posponer 10 min" onPress={handlePostpone} />
      <Button title="Descartar (5 min)" onPress={handleDismiss} />
      <Button title="Desactivar" onPress={handleDeactivate} />
    </View>
  );
}
