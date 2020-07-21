import React, { useState } from 'react';
import { SafeAreaView, Alert, View, Text, TextInput, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';

import api from '../services/api';

export default function Book({ navigation }) {
  const [date, setDate] =useState('');
  const id = navigation.getParam('id');

  async function headleSubmit() {
    const user_id = await AsyncStorage.getItem('user');
    
    await api.post(`/spots/${id}/bookings`, {
       date 
      }, { 
        headers: { user_id }
      });

    Alert.alert('Solicitação de reserva enviada.');

    navigation.navigate('List');
  }

  function headleCancel() {
    navigation.navigate('List');
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>DATA DE INTERESSE *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Qual data você quer resevar?"
        placeholderTextColor="#999"
        autoCapitalize="words" 
        autoCorrect={false} /* Não corrigir o texto */
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity onPress={headleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Solicitar reservar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={headleCancel} style={[styles.button, styles.cancelButton]}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    margin: 30,
    flex: 1,
  },

  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },

  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },

  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});