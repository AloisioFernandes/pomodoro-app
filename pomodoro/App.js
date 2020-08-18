import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'


import Sliders from './components/Sliders'
// Vibration.vibrate([500, 500, 500])

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#cecece" />
      <Text style={styles.counter}>25:00</Text>

      <Sliders />

      <View style={styles.buttonGroup}>
        <RectButton style={styles.start}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </RectButton>
        <RectButton style={styles.pause}>
          <Text style={styles.buttonText}>Parar</Text>
        </RectButton>
        <RectButton style={styles.reset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counter: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 70,
    marginBottom: 60,
    maxHeight: 80
  },

  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 60,
    width: 300
  },

  start: {
    backgroundColor: '#0f0',
    height: 40,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  pause: {
    backgroundColor: '#f00',
    height: 40,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  reset: {
    backgroundColor: '#00f',
    height: 40,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonText: {
    color: '#fff'
  }
});
