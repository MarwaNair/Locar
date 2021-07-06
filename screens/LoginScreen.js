import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {windowHeight, windowWidth} from '../constants/size';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={4000}
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <Animatable.View style={{flex: 2}} animation="fadeInUpBig">
        <LinearGradient
          style={styles.footer}
          colors={['#407CEE', '#508FF3', '#69ADFA']}
          useAngle={true}
          angle={34}>
          <Text style={styles.title}>Bienvenue !</Text>
          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
              style={[styles.signIn, {backgroundColor: '#66AAF9'}]}>
              <Text style={styles.textSign}>Se connecter</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpScreen')}
              style={[styles.signIn, {backgroundColor: '#FEBE33'}]}>
              <Text style={styles.textSign}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animatable.View>
    </View>
  );
};
export default LoginScreen;

const height_logo = windowHeight * 0.15;
const width_logo = windowWidth * 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingVertical: hp('6%'),
    paddingHorizontal: wp('3%'),
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: width_logo,
    height: height_logo,
    alignSelf: 'center',
  },
  title: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('10%'),
    alignSelf: 'center',
  },

  buttons: {
    marginTop: hp('4%'),
  },
  signIn: {
    width: wp('45%'),
    height: hp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  textSign: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('5%'),
    alignSelf: 'center',
  },
});
