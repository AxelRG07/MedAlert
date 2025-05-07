import AsyncStorage from '@react-native-async-storage/async-storage';
import { Reminder } from '../models/ReminderModel';

const STORAGE_KEY = 'REMINDERS';

export async function saveReminder(reminder: Reminder) {
  const reminders = await getReminders();
  reminders.push(reminder);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export async function getReminders(): Promise<Reminder[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export async function updateReminder(id: string, updated: Reminder) {
  let reminders = await getReminders();
  reminders = reminders.map(r => (r.id === id ? updated : r));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
}

export async function deleteReminder(id: string) {
  const reminders = await getReminders();
  const filtered = reminders.filter(r => r.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
