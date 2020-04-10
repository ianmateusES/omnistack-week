import React, { useState, useEffect } from 'react';
import socketio from 'socket.io-client';
import { Alert, SafeAreaView, ScrollView, Image, AsyncStorage, StyleSheet } from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.25.56:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua resevar em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADO' : 'REJEITADA'}`);
      })
    })
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, []);

  return (/* Faz oculpar somenta a area segura */
    <SafeAreaView style={styles.container}> 
      <Image style={styles.logo} source={logo} />
      
      <ScrollView> 
        { techs.map(tech => (<SpotList key={tech} tech={tech} />)) }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },

  logo: {
    height: 32,
    resizeMode: 'contain', /* Faz a imagem redimencionar ao tamaho disponivel */
    alignSelf: 'center',
    marginTop: 10,
  },

  test: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
  }

});