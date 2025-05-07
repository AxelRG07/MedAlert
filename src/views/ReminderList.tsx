import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { Reminder } from '../models/ReminderModel';
import { getReminders } from '../presenters/ReminderListPresenter';
import { useNavigation } from '@react-navigation/native';

export default function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadReminders = async () => {
      const data = await getReminders();
      setReminders(data);
    };
    const unsubscribe = navigation.addListener('focus', loadReminders);
    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      <Button title="Agregar Recordatorio" onPress={() => navigation.navigate('ReminderForm')} />
      <FlatList
        data={reminders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ReminderDetail', { reminder: item })}>
            <Text>{item.medication} - {item.dosage}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
