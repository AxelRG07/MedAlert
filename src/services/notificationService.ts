import * as Notifications from 'expo-notifications';
import { Reminder } from '../models/ReminderModel';
import { Platform } from 'react-native';

// Solicitar permisos para notificaciones (ejecutar al inicio)
export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    console.warn('Permisos de notificación no concedidos');
  }
}

// Programar una notificación local usando trigger tipo calendar
export async function scheduleNotification(reminder: Reminder): Promise<string> {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  
  const date = new Date(reminder.time);

  // Definir trigger tipo calendar 
  const trigger: Notifications.CalendarTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    year: date.getFullYear(),
    month: date.getMonth() + 1, 
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: 0,
    repeats: false,
  } as const;

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `💊 Hora de tomar ${reminder.medication}`,
      body: `Dosis: ${reminder.dosage}, Vía: ${reminder.route}`,
      data: JSON.parse(JSON.stringify(reminder)), // transformamos Reminder a objeto plano
    },
    trigger,
  });

  return notificationId;
}

// Cancelar una notificación por su ID
export async function cancelNotification(notificationId: string) {
  await Notifications.cancelScheduledNotificationAsync(notificationId);
}

// Reprogramar notificación X minutos después del momento actual
export async function rescheduleNotification(reminder: Reminder, minutes: number): Promise<string> {
  const now = new Date();
  const futureDate = new Date(now.getTime() + minutes * 60 * 1000);

  const trigger: Notifications.CalendarTriggerInput = {
    type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
    year: futureDate.getFullYear(),
    month: futureDate.getMonth() + 1,
    day: futureDate.getDate(),
    hour: futureDate.getHours(),
    minute: futureDate.getMinutes(),
    second: 0,
    repeats: false,
  } as const;

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: `⏰ Recordatorio reprogramado: ${reminder.medication}`,
      body: `Dosis: ${reminder.dosage}, Vía: ${reminder.route}`,
      data: JSON.parse(JSON.stringify(reminder)),
    },
    trigger,
  });

  return notificationId;
}
