import * as React from 'react';
import {
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';
import {useUser} from '../components/UserProvider';

export default function QR({navigation}) {
  const {user} = useUser();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={require('../assets/menu.png')}
            style={{
              height: 20,
              width: 20,
              marginLeft: 370,
              marginTop: hp('1.5%'),
            }}
          />
        </TouchableOpacity>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.text}> {user.prenom}</Text>

        <Text style={styles.voiture}> {user.email}</Text>
      </View>

      <View
        style={{height: '100%', backgroundColor: '#fff', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: '#000',
            fontSize: wp('7%'),
            marginTop: '10%',
            marginBottom: '5%',
          }}>
          {' '}
          Ajouter une voiture
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: '#000',
            fontSize: wp('6%'),
            marginBottom: '7%',
          }}>
          {' '}
          Scannez le code QR
        </Text>

        <QRCode
          value={global.car.Matricule}
          size={wp('55%')}
          bgColor="#FFFFFF"
          fgColor="#000000"
        />
        <View style={{flexDirection: 'row', marginTop: hp('10%')}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('AjouterScreen')}>
            <Image
              source={require('../assets/Annuler2.png')}
              style={{width: 150, height: 80}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VoituresScreen')}>
            <Image
              source={require('../assets/confimer2.png')}
              style={{width: 155, height: 75, marginLeft: wp('12%')}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
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
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
  },
  avatar: {
    marginTop: hp('-0.5%'),
    marginStart: wp('-3%'),
    height: hp('15%'),
    width: wp('45%'),
  },
  text: {
    marginTop: hp('-13%'),
    marginStart: wp('33.5%'),
    fontSize: wp('8.5%'),

    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },
  voiture: {
    marginTop: hp('1%'),
    marginStart: wp('37%'),
    fontSize: wp('4%'),
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },

  footer: {
    height: 2,
    width: wp('100%'),
    backgroundColor: '#EBEBEB',
    marginTop: hp('-26%'),
  },
  back: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    marginStart: wp('4%'),
    height: hp('2%'),
    width: wp('7.5%'),
  },
});
