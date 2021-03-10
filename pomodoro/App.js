import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import Slider from '@react-native-community/slider'

let countdownTimeout

export default function App() {
  const [workTime, setWorkTime] = useState(5 * 60)
  const [restTime, setRestTime] = useState(1 * 60)
  const [currentTime, setCurrentTime] = useState(5 * 60)
  const [isHome, setIsHome] = useState(true)
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
    setIsHome(false)
  }

  function handlePause() {
    clearTimeout(countdownTimeout)
    setIsRunning(false)
  }

  function handleComeback() {
    setIsRunning(true)
  }

  function handleReset() {
    clearTimeout(countdownTimeout)
    setIsRunning(false)
    setCurrentTime(workTime)
    setIsHome(true)
  }

  useEffect(() => {
    if(isRunning && currentTime > 0) {
      countdownTimeout = setTimeout(() => {
        setCurrentTime(currentTime - 1)
      }, 1000) 
    } else if (isRunning && !isRest && currentTime === 0) {
      Vibration.vibrate([500, 500, 500])
      clearTimeout(countdownTimeout)
      setIsRest(true)

      setTimeout(() => {
        setCurrentTime(restTime)
      }, 1000)
    } else if (isRunning && isRest && currentTime === 0) {
      Vibration.vibrate([500, 500, 500])
      clearTimeout(countdownTimeout)
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

      <View style={{alignItems: 'center'}}>
        <Text style={styles.label}>Tempo de Trabalho</Text>
        <View style={styles.range}>
          <Slider
            style={{width: 270, height: 33}}
            minimumValue={5}
            maximumValue={50}
            thumbTintColor="#03A9F4"
            minimumTrackTintColor="#03A9F4"
            step={5}
            onValueChange={(value) => setWorkTime(value * 60)}
          />
          <Text style={styles.timeLabel}>{String(Math.round(workTime / 60)).padStart(2, '0')} min</Text>
        </View>

        <Text style={styles.label}>Tempo de Descanço</Text>
        <View style={styles.range}>
          <Slider
            style={{width: 270, height: 33}}
            minimumValue={1}
            maximumValue={10}
            thumbTintColor="#FFB74D"
            minimumTrackTintColor="#FFB74D"
            step={1}
            onValueChange={(value) => setRestTime((value) * 60)}
          />
          <Text style={styles.timeLabel}>{String(Math.round(restTime / 60)).padStart(2, '0')} min</Text>
        </View>
      </View>

      { isHome ? (
        <RectButton style={[styles.button, styles.start]} onPress={handleStart}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </RectButton>
      ) : (
        <View style={styles.buttonGroup}>
          { isRunning ? (
            <RectButton style={[styles.button, styles.pause]} onPress={handlePause}>
              <Text style={styles.buttonText}>Parar</Text>
            </RectButton>
          ) : (
            <RectButton style={[styles.button, styles.pause]} onPress={handleComeback}>
              <Text style={styles.buttonText}>Retomar</Text>
            </RectButton>
          ) }
          <RectButton style={[styles.button, styles.reset]} onPress={handleReset}>
            <Text style={styles.buttonText}>Reiniciar</Text>
          </RectButton>
        </View>
      ) }
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

  label: {
    fontSize: 18,
    marginVertical: 4
  },

  range: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  timeLabel: {
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 5
  },

  buttonGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: 60,
    width: '90%'
  },

  button: {
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -50
  },

  start: {
    backgroundColor: '#64DD17',
    width: '50%',
    borderRadius: 8 
  },

  pause: {
    backgroundColor: '#f44336',
    width: '45%',
    borderRadius: 8
  },

  reset: {
    backgroundColor: '#1E88E5',
    width: '45%',
    borderRadius: 8
  },

  buttonText: {
    color: '#fff',
    fontSize: 22
  }
});
