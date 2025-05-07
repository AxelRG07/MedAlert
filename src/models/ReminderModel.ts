export interface Reminder {
  id: string;
  medication: string;
  dosage: string;
  time: string;
  route: string;
  notificationId?: string;
}
