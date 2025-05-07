import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addReminder } from '../presenters/ReminderPresenter';
import { useNavigation } from '@react-navigation/native';
import { Reminder } from '../models/ReminderModel';
import uuid from 'react-native-uuid';

export default function ReminderForm() {
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [time, setTime] = useState('');
  const [route, setRoute] = useState('');
  const navigation = useNavigation<any>();

  const handleSubmit = async () => {
    const reminder: Reminder = {
      id: uuid.v4().toString(),
      medication,
      dosage,
      time,
      route,
    };
    await addReminder(reminder);
    navigation.goBack();
  };

  return (
    <View>
      <TextInput placeholder="Medicamento" onChangeText={setMedication} value={medication} />
      <TextInput placeholder="Dosis" onChangeText={setDosage} value={dosage} />
      <TextInput placeholder="Hora (ISO)" onChangeText={setTime} value={time} />
      <TextInput placeholder="Vía" onChangeText={setRoute} value={route} />
      <Button title="Guardar Recordatorio" onPress={handleSubmit} />
    </View>
  );
}
