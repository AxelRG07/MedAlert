import { Reminder } from '../models/ReminderModel';
import * as Storage from '../services/storage';

export async function getReminders(): Promise<Reminder[]> {
  return await Storage.getReminders();
}
