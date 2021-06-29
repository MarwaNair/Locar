import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Profil from './Profil';
import Editer from './Editer';
import {useUser} from '../components/UserProvider';
import {AuthContext} from '../components/Context';
const Parametre = ({navigation}) => {
  const {user} = useUser();
  const {signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />

        <Text
          style={{
            marginTop: hp('-8%'),
            marginStart: wp('33.5%'),
            fontSize: wp('7%'),
            fontFamily: 'Montserrat-Bold',
            color: '#FFFFFF',
          }}>
          {' '}
          {user.prenom}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('LocaliserScreen')}>
          <Image
            source={require('../assets/commencer.png')}
            style={styles.commencer}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text
          style={{
            marginTop: hp('-20%'),
            marginStart: wp('35%'),
            fontSize: wp('5%'),
            fontFamily: 'Montserrat-Regular',
            color: '#FFFFFF',
          }}>
          {' '}
          Bienvenue,
        </Text>
      </View>

      <View styles={styles.footer}>
        <TouchableOpacity
          style={{marginTop: hp('10%')}}
          onPress={() => navigation.navigate('EditScreen')}>
          <Image
            source={require('../assets/prof.png')}
            resizeMode="contain"
            style={styles.Button}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('VoituresScreen')}>
          <Image
            source={require('../assets/voiture.png')}
            resizeMode="contain"
            style={styles.Button}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MdpScreen')}>
          <Image
            source={require('../assets/securite.png')}
            resizeMode="contain"
            style={styles.Button}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('../assets/aide.png')}
            resizeMode="contain"
            style={styles.Button}
          />
        </TouchableOpacity>

        <View
          style={{
            borderBottomColor: '#EBEBEB',
            borderBottomWidth: 2,
            width: wp('100%'),
            height: hp('2%'),
            bottom: hp('-9%'),
          }}></View>

        <TouchableOpacity
          style={{
            width: wp('35%'),
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
          }}
          onPress={e => signOut()}>
          <Image
            source={require('../assets/dec.png')}
            style={{
              alignSelf: 'flex-start',
              marginLeft: wp('5%'),
              width: wp('30%'),
              top: hp('5%'),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Parametre;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },

  header: {
    height: hp('30%'),
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
    height: hp('70%'),
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
    fontSize: wp('8.5%'),
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
  commencer: {
    height: hp('12%'),
    top: hp('3%'),
    alignSelf: 'center',
  },

  Modif: {
    color: '#407CEE',
    fontSize: wp('4%'),
    marginLeft: wp('6%'),
    marginBottom: hp('1%'),
    fontFamily: 'Montserrat-Regular',
  },

  Modif2: {
    color: '#000',
    fontSize: wp('4%'),
    marginLeft: wp('53%'),
    marginBottom: hp('1%'),
    top: hp('-3.5%'),
    fontFamily: 'Montserrat-Regular',
  },
  line: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('100%'),
    top: hp('-3.5%'),
  },
  Button: {
    alignSelf: 'center',
    height: hp('10%'),
  },
});
