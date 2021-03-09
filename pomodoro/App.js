import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import Slider from '@react-native-community/slider'

// Vibration.vibrate([500, 500, 500])
let countdownTimeout

export default function App() {
  const [workTime, setWorkTime] = useState(0.10 * 60)
  const [restTime, setRestTime] = useState(0.05 * 60)
  const [currentTime, setCurrentTime] = useState(0.10 * 60)
  const [isRest, setIsRest] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const minutes = Math.floor(currentTime / 60)
  const seconds = currentTime % 60

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  function handleStart() {
    setCurrentTime(workTime)
    setIsRest(false)
    setIsRunning(true)
  }

  function handlePause() {
    clearTimeout(countdownTimeout)
    setIsRunning(false)
  }

  function handleReset() {
    clearTimeout(countdownTimeout)
    setIsRunning(false)
    setCurrentTime(workTime)
  }

  useEffect(() => {
    if(isRunning && currentTime > 0) {
      countdownTimeout = setTimeout(() => {
        setCurrentTime(currentTime - 1)
      }, 1000) 
    } else if (isRunning && !isRest && currentTime === 0) {
      setIsRest(true)
      setTimeout(() => {
        setCurrentTime(restTime)
      }, 1000)
    } else if (isRunning && isRest && currentTime === 0) {
      setIsRest(false)
      setTimeout(() => {
        setCurrentTime(workTime)
      }, 1000)
    }
  }, [isRunning, currentTime])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#cecece" />

      <View style={styles.counterContainer}>
        <Text style={styles.counter}>
          {`${minuteLeft}${minuteRight}:${secondLeft}${secondRight}`}
        </Text>
      </View>

      <View>
        <View style={styles.range}>
          <Slider
            style={{width: 270, height: 33}}
            minimumValue={1} // <----- 5
            maximumValue={50}
            thumbTintColor="#09f"
            minimumTrackTintColor="#09f"
            step={5}
            onValueChange={(value) => setWorkTime(value * 60)}
          />
          <Text>{workTime} min</Text>
        </View>

        <View style={styles.range}>
          <Slider
            style={{width: 270, height: 33}}
            minimumValue={1}
            maximumValue={10}
            thumbTintColor="#fa0"
            minimumTrackTintColor="#fa0"
            step={1}
            onValueChange={(value) => setRestTime(value * 60)}
          />
          <Text>{restTime} min</Text>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <RectButton style={[styles.button, styles.start]} onPress={handleStart}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </RectButton>
        <RectButton style={[styles.button, styles.pause]} onPress={handlePause}>
          <Text style={styles.buttonText}>Parar</Text>
        </RectButton>
        <RectButton style={[styles.button, styles.reset]} onPress={handleReset}>
          <Text style={styles.buttonText}>Reiniciar</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },

  counterContainer: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
    minWidth: '70%',
    marginBottom: 20,
    borderRadius: 10
  },

  counter: {
    fontSize: 80,
  },

  range: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 60,
    width: 300
  },

  button: {
    height: 40,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  start: {
    backgroundColor: '#7e0'    
  },

  pause: {
    backgroundColor: '#f42'
  },

  reset: {
    backgroundColor: '#57f'
  },

  buttonText: {
    color: '#fff'
  }
});
