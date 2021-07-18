import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../components/UserProvider';

const Mdp = ({navigation}) => {
  const {user, setUser} = useUser();

  const [data, setData] = useState({
    prevPassword: '',
    newPassword: '',
    newPasswordConf: '',
  });

  const handlePrevPasswordChange = val => {
    setData({
      ...data,
      prevPassword: val,
    });
  };
  const handlePasswordChange = val => {
    setData({
      ...data,
      newPassword: val,
    });
  };
  const handlePasswordConfChange = val => {
    setData({
      ...data,
      newPasswordConf: val,
    });
  };

  const handleUpdate = async () => {
    if (data.prevPassword === user.password) {
      if (data.newPassword === data.newPasswordConf && data.newPassword != '') {
        let user1 = {
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          num: user.num,
          password: data.newPassword,
        };
        setUser({
          ...user,
          password: data.newPassword,
        });
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user1));
        } catch (e) {
          console.log(e);
        }
        navigation.goBack();
      } else {
        Alert.alert(
          '',
          'Veuillez saisir le meme mot de passe lors de la confirmation.',
          [{text: 'OK'}],
        );
      }
    } else {
      Alert.alert(
        'Mot de passe invalide!',
        'Veuillez saisir votre ancien mot de passe.',
        [{text: 'OK'}],
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />

        <Text
          style={{
            marginTop: hp('-13%'),
            marginStart: wp('33.5%'),
            fontSize: wp('8.5%'),
            fontFamily: 'Montserrat-Bold',
            color: '#FFFFFF',
          }}>
          {' '}
          {user.prenom}
        </Text>

        <Image
          source={require('../assets/sec.png')}
          style={styles.profile}
          resizeMode="contain"
        />

        <Text style={styles.proText}> Sécurité</Text>
      </View>

      <View style={styles.footer}>
        <View style={{flex: 1}}>
          <Text
            style={{
              marginTop: hp('11%'),
              marginBottom: hp('11.5%'),
              fontSize: wp('6%'),
              fontFamily: 'Montserrat-Regular',
              alignSelf: 'center',
              color: '#000',
            }}>
            Changer de mot de passe
          </Text>
        </View>

        <View style={{flex: 1}}>
          <View style={[styles.line, {top: hp('-5%')}]}></View>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            style={{flexGrow: 1, top: hp('-4%')}}>
            <Text style={styles.Modif}>Ancien mot de passe</Text>
            <TextInput
              placeholder="* * * * * * * * * * *"
              style={styles.Modif2}
              onChangeText={val => handlePrevPasswordChange(val)}></TextInput>

            <View style={styles.sline}></View>

            <Text style={styles.Modif}>Nouveau mot de passe</Text>
            <TextInput
              placeholder="* * * * * * * * * * *"
              style={styles.Modif2}
              onChangeText={val => handlePasswordChange(val)}></TextInput>

            <View style={styles.sline}></View>

            <Text style={styles.Modif}>Confirmation</Text>
            <TextInput
              placeholder="* * * * * * * * * * *"
              keyboardType="email-address"
              autoCompleteType="email"
              style={styles.Modif2}
              onChangeText={val => handlePasswordConfChange(val)}></TextInput>
          </KeyboardAwareScrollView>
          <View style={[styles.line, {marginVertical: hp('-0.2%')}]}></View>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity
            style={{width: wp('35%'), alignSelf: 'center'}}
            onPress={handleUpdate}>
            <Image
              source={require('../assets/sauvegarder.png')}
              style={{
                width: 150,
                height: 60,
                marginTop: hp('1%'),
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <View style={{position: 'absolute', bottom: hp('4.5%')}}>
            <TouchableOpacity
              style={{
                width: wp('10%'),
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/ret.png')}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: hp('2%'),
                  marginStart: wp('4%'),
                  height: hp('2%'),
                  width: wp('8%'),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Mdp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },

  header: {
    height: hp('20%'),
    width: wp('100%'),
    backgroundColor: '#407CEE',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      height: 20,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },

  footer: {
    height: hp('80%'),
    width: wp('100%'),
  },

  avatar: {
    marginTop: hp('3%'),
    marginStart: wp('-3%'),
    height: hp('14.5%'),
    width: wp('40%'),
  },

  text: {
    marginTop: hp('-13%'),
    marginStart: wp('33.5%'),
    fontSize: wp('7%'),
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },

  proText: {
    marginTop: hp('-3%'),
    marginStart: wp('45%'),
    fontSize: wp('5%'),
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },
  profile: {
    marginTop: hp('1.8%'),
    marginStart: wp('36%'),
    height: hp('3%'),
    width: wp('9%'),
    justifyContent: 'flex-start',
  },

  Modif: {
    color: '#407CEE',
    fontSize: wp('3.2%'),
    marginLeft: wp('6%'),
    marginTop: hp('-0.5%'),
    fontFamily: 'Montserrat-Regular',
  },

  Modif2: {
    color: '#000',
    fontSize: wp('3.2%'),
    marginLeft: wp('53%'),
    marginBottom: hp('0.5%'),
    marginTop: hp('-0.5%'),
    top: hp('-2.8%'),
    fontFamily: 'Montserrat-Regular',
  },
  line: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('100%'),
    marginVertical: hp('1.5%'),
  },
  sline: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('40%'),
    height: hp('-1%'),
    alignSelf: 'flex-end',
    right: wp('6%'),
    top: hp('-3.5%'),
  },
});
