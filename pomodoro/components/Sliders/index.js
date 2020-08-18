import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from '@react-native-community/slider'

const Sliders = () => {
  return (
    <View>
      <View style={styles.range}>
        <Slider
          style={{width: 270, height: 33}}
          minimumValue={5}
          maximumValue={50}
          thumbTintColor="#09f"
          minimumTrackTintColor="#09f"
          step={5}
        />
        <Text>25 min</Text>
      </View>

      <View style={styles.range}>
        <Slider
          style={{width: 270, height: 33}}
          minimumValue={1}
          maximumValue={10}
          thumbTintColor="#fa0"
          minimumTrackTintColor="#fa0"
          step={1}
        />
        <Text>10 min</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  range: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Sliders