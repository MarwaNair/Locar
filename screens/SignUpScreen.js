import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
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
import {useUser} from '../components/UserProvider';

const SignInScreen = ({navigation}) => {
  const [data, setData] = useState({
    nom: '',
    prenom: '',
    email: '',
    num: '',
    password: '',
    passwordConf: '',
    secureTextEntry: 'true',
    confirmSecureTextEntry: 'true',
  });

  const {setUser} = useUser();
  const handleNomChange = val => {
    setData({
      ...data,
      nom: val,
    });
  };

  const handlePrenomChange = val => {
    setData({
      ...data,
      prenom: val,
    });
  };
  const handleNumChange = val => {
    setData({
      ...data,
      num: val,
    });
  };

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
  const handlePasswordConfChange = val => {
    setData({
      ...data,
      passwordConf: val,
    });
  };

  const updateSecureTextEntry = val => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = val => {
    setData({
      ...data,
      confirmSecureTextEntry: !data.confirmSecureTextEntry,
    });
  };
  const {signUp} = useContext(AuthContext);

  const registerHandle = user => {
    if (user.password === user.passwordConf) {
      let user1 = {
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        num: user.num,
        password: user.password,
      };
      setUser(user1);
      signUp(user1);
    } else {
      Alert.alert(
        'Mot de passe invalide!',
        'Veuillez saisir le meme mot de passe lors de la vérification.',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('SignInScreen')}>
          <Text style={[styles.text_header, {alignSelf: 'flex-end'}]}>
            Se connecter
          </Text>
        </TouchableOpacity>
        <Text style={styles.title_header}>Inscription</Text>
        <Text style={styles.text_header}>Bienvenue parmi nous !</Text>
        <Text style={styles.text_header}>
          Inscrivez vous pour accéder à nos services.
        </Text>
      </View>

      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <KeyboardAwareScrollView enableOnAndroid={true} style={{flexGrow: 1}}>
          <View style={styles.title_footer}>
            <Image source={require('../assets/user.png')} />
            <Text style={styles.text_footer}>Informations personnelles</Text>
          </View>

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={styles.inputWrapper}>
              <View style={styles.buttonContainer}>
                <TextInput
                  placeholder="Nom"
                  style={styles.textInput}
                  placeholderTextColor="#A2A1A1"
                  onChangeText={val => handleNomChange(val)}
                />
              </View>

              <View style={styles.buttonContainer}>
                <TextInput
                  placeholder="Prenom"
                  style={styles.textInput}
                  placeholderTextColor="#A2A1A1"
                  onChangeText={val => handlePrenomChange(val)}
                />
              </View>
            </View>
            <View style={[styles.buttonContainer, {width: wp('80%')}]}>
              <TextInput
                placeholder="Adresse e-mail"
                style={styles.textInput}
                keyboardType="email-address"
                placeholderTextColor="#A2A1A1"
                onChangeText={val => handleEmailChange(val)}
              />
            </View>
            <View style={[styles.buttonContainer, {width: wp('80%')}]}>
              <TextInput
                placeholder="N° de téléphone"
                placeholderTextColor="#A2A1A1"
                style={styles.textInput}
                keyboardType="phone-pad"
                placeholderTextColor="#A2A1A1"
                onChangeText={val => handleNumChange(val)}
              />
            </View>
          </View>

          <View style={styles.title_footer}>
            <Image source={require('../assets/mdp.png')} />
            <Text style={styles.text_footer}>Mot de passe</Text>
          </View>

          <View style={{flexDirection: 'column', alignItems: 'center'}}>
            <View style={[styles.buttonContainer, {width: wp('80%')}]}>
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
                    style={{marginHorizontal: 10}}
                  />
                ) : (
                  <Feather
                    name="eye"
                    color="grey"
                    size={20}
                    style={{marginHorizontal: 10}}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={[styles.buttonContainer, {width: wp('80%')}]}>
              <TextInput
                placeholder="Confirmer le mot de passe"
                style={styles.textInput}
                secureTextEntry={data.confirmSecureTextEntry ? true : false}
                placeholderTextColor="#A2A1A1"
                onChangeText={val => handlePasswordConfChange(val)}
              />
              <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                {data.confirmSecureTextEntry ? (
                  <Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                    style={{marginHorizontal: 10}}
                  />
                ) : (
                  <Feather
                    name="eye"
                    color="grey"
                    size={20}
                    style={{marginHorizontal: 10}}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <LinearGradient
            colors={['#407CEE', '#69ADFA']}
            style={styles.gradient}
            start={{x: 0, y: 0.5}}
            end={{x: 1, y: 0.5}}>
            <TouchableOpacity onPress={e => registerHandle(data)}>
              <Text
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: wp('4.8 %'),
                  color: '#fff',
                }}>
                {' '}
                S'inscrire{' '}
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </KeyboardAwareScrollView>
      </Animatable.View>
    </View>
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
    paddingVertical: hp('2%'),
  },
  footer: {
    alignItems: 'flex-start',
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 67,
    borderTopRightRadius: 67,
    paddingHorizontal: wp('8%'),
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
  text_footer: {
    color: '#000000',
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-Regular',
    marginLeft: wp('2.5%'),
  },
  title_footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },

  textInput: {
    flex: 1,
    paddingLeft: wp('5%'),
    color: '#05375a',
    fontFamily: 'Montserrat-Regular',
    fontSize: wp('3.5%'),
  },

  buttonContainer: {
    marginVertical: hp('1.5%'),
    marginHorizontal: wp('1.5%'),
    width: wp('39%'),
    height: hp('6%'),
    backgroundColor: '#F2F2F2',
    flexDirection: 'row',
    borderRadius: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  inputWrapper: {
    flexDirection: 'row',
  },

  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    width: '100%',
    bottom: 120,
    alignSelf: 'center',
  },
  gradient: {
    width: wp('55%'),
    height: hp('6%'),
    marginVertical: hp('2.5%'),
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
});
