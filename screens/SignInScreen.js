import React, {useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../components/Context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    nom: '',
    prenom: '',
    email: '',
    num: '',
    password: '',
    secureTextEntry: 'true',
  });

  const {signIn} = useContext(AuthContext);

  const handleEmailChange = val => {
    setData({
      ...data,
      email: val,
    });
  };

  const handlePasswordChange = val => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = val => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const loginHandle = (email, password) => {
    signIn(email, password);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={[styles.text_header, {alignSelf: 'flex-end'}]}>
            S'inscrire
          </Text>
        </TouchableOpacity>
        <Text style={styles.title_header}>Connexion</Text>
        <Text style={styles.text_header}>Ravis de vous revoir !</Text>
        <Text style={styles.text_header}>
          Authentifiez votre compte pour accéder à nos services.
        </Text>
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <View style={styles.action}>
          <Image source={require('../assets/user.png')} />
          <View style={[styles.circle, {backgroundColor: '#69ADFA'}]} />
          <TextInput
            placeholder="Adresse e-mail"
            style={styles.textInput}
            keyboardType="email-address"
            placeholderTextColor="#A2A1A1"
            onChangeText={val => handleEmailChange(val)}
          />
        </View>

        <View style={styles.action}>
          <Image source={require('../assets/mdp.png')} />

          <View style={[styles.circle, {backgroundColor: '#69ADFA'}]} />

          <TextInput
            placeholder="Mot de passe"
            style={styles.textInput}
            placeholderTextColor="#A2A1A1"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={val => handlePasswordChange(val)}
          />

          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather
                name="eye-off"
                color="grey"
                size={20}
                style={{marginHorizontal: 5}}
              />
            ) : (
              <Feather
                name="eye"
                color="grey"
                size={20}
                style={{marginHorizontal: 5}}
              />
            )}
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['#407CEE', '#69ADFA']}
          style={styles.gradient}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}>
          <TouchableOpacity
            onPress={e => loginHandle(data.email, data.password)}>
            <Text style={styles.textSign}> Se connecter </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animatable.View>
    </SafeAreaView>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#407CEE',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('4%'),
  },
  footer: {
    alignItems: 'center',
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 67,
    borderTopRightRadius: 67,
    paddingHorizontal: wp('10%'),
    paddingVertical: hp('3%'),
  },
  title_header: {
    color: '#fff',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('10%'),
    marginBottom: hp('1%'),
  },
  text_header: {
    color: '#fff',
    fontFamily: 'Montserrat-Medium',
    fontSize: wp('4.5 %'),
  },

  action: {
    paddingHorizontal: wp('1%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    borderWidth: 1,
    borderColor: '#5495F4',
    borderRadius: 26,
    height: hp('7%'),
    width: wp('80%'),
  },

  textInput: {
    flex: 1,
    paddingLeft: wp('1%'),
    color: '#05375a',
    fontFamily: 'Montserrat-Regular',
    fontSize: wp('3.8%'),
  },

  textSign: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: wp('4.8 %'),
    color: '#fff',
  },
  circle: {
    marginHorizontal: wp('2%'),
    height: 4,
    width: 4,
    borderRadius: 20,
  },
  forgotButton: {
    marginVertical: hp('1%'),
    flexDirection: 'row',
  },
  forgotText: {
    fontSize: wp('3.8%'),
    color: '#3F7BEE',
    fontFamily: 'Montserrat-Regular',
  },
  buttonContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },

  gradient: {
    width: wp('55%'),
    height: hp('6%'),
    borderRadius: 24,
    top: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
