import { Reminder } from '../models/ReminderModel';
import * as Storage from '../services/storage';
import * as Notifications from '../services/notificationService';

export async function addReminder(reminder: Reminder) {
  const notificationId = await Notifications.scheduleNotification(reminder);
  reminder.notificationId = notificationId;
  await Storage.saveReminder(reminder);
}
