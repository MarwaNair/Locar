import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  ImageBackground,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import {windowHeight, windowWidth} from '../constants/size';

const SplashScreen = ({navigation}) => {
  return (
    <Animatable.View style={styles.container}>
      <ImageBackground
        source={require('../assets/splash.png')}
        style={styles.image}>
        <Animatable.Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          animation="rubberBand"
          duration={4000}
        />
      </ImageBackground>
    </Animatable.View>
  );
};

export default SplashScreen;

const height_logo = windowHeight * 0.15;
const width_logo = windowWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: hp('100%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: wp('50%'),
    height: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    bottom: hp('2%'),
    right: wp('4%'),
  },
  logo: {
    width: width_logo,
    height: height_logo,
    alignSelf: 'center',
  },
});
