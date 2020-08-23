import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Vibration } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import Slider from '@react-native-community/slider'

// Vibration.vibrate([500, 500, 500])

export default function App() {
  const [workTime, setWorkTime] = useState(5)
  const [restTime, setRestTime] = useState(1)
  const [counterMinutes, setCounterMinutes] = useState(0)
  const [counterSeconds, setCounterSeconds] = useState(0)
  const [resetTime, setResetTime] = useState(0)

  function handleStart() {
    setResetTime(workTime)
    setCounterMinutes(workTime)
    decreaseTime(workTime)
  }

  function handlePause() {
    console.log("para")
  }

  function handleReset() {
    setCounterMinutes(resetTime)
    setWorkTime(resetTime)
  }

  function decreaseTime(minutes) {
    let seconds = 60
    minutes--
    setCounterMinutes(minutes)
    setCounterSeconds(59)
    let interval = setInterval(() => {
      seconds--
      setCounterSeconds(seconds)
      if(seconds < 0 && minutes >= 1) {
        minutes--
        setCounterMinutes(minutes)
        seconds = 59
        setCounterSeconds(seconds)
      }

      if(minutes === 0 && seconds === 0) {
        clearInterval(interval)      
      }
    }, 1000);    
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" backgroundColor="#cecece" />
      <Text style={styles.counter}>
        {String(counterMinutes)[1] ? counterMinutes : `0${counterMinutes}`}:{String(counterSeconds)[1] ? counterSeconds : `0${counterSeconds}`}
      </Text>

      <View>
        <View style={styles.range}>
          <Slider
            style={{width: 270, height: 33}}
            minimumValue={1} // <----- 5
            maximumValue={50}
            thumbTintColor="#09f"
            minimumTrackTintColor="#09f"
            step={5}
            onValueChange={setWorkTime}
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
            onValueChange={setRestTime}
          />
          <Text>{restTime} min</Text>
        </View>
      </View>

      <View style={styles.buttonGroup}>
        <RectButton style={styles.start} onPress={handleStart}>
          <Text style={styles.buttonText}>Iniciar</Text>
        </RectButton>
        <RectButton style={styles.pause} onPress={handlePause}>
          <Text style={styles.buttonText}>Parar</Text>
        </RectButton>
        <RectButton style={styles.reset} onPress={handleReset}>
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

  start: {
    backgroundColor: '#7e0',
    height: 40,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
    
  },

  pause: {
    backgroundColor: '#f42',
    height: 40,
    width: 80,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },

  reset: {
    backgroundColor: '#57f',
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
