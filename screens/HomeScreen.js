import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {useUser} from '../components/UserProvider';

const HomeScreen = ({navigation}) => {
  const {user} = useUser();

  setTimeout(() => {
    navigation.replace('ParametreScreen');
  }, 1500);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/hello.png')}
        style={styles.image}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{user.prenom} </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  text: {
    color: '#fff',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('6%'),
  },
});
