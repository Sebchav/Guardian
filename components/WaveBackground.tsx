import React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function WaveBackground() {
  return (
    <Svg
      width="100%"
      height={100}
      viewBox="0 0 1440 320"
      style={styles.wave}
    >
      <Path
        fill="#D6D5FF"
        d="M0,160L48,154.7C96,149,192,139,288,138.7C384,139,480,149,576,144C672,139,768,117,864,101.3C960,85,1056,75,1152,101.3C1248,128,1344,192,1392,224L1440,256V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wave: {
    position: 'absolute',
    top: -100,
    left: 0,
  },
});
