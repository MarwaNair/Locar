import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Profil from './Profil';

import {useUser} from '../components/UserProvider';

const Editer = ({navigation}) => {
  const {user} = useUser();

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
          source={require('../assets/profile.png')}
          style={styles.profile}
          resizeMode="contain"
        />

        <Text style={styles.proText}> Profil</Text>
      </View>

      <View>
        <View style={styles.footer}>
          <Image
            source={require('../assets/avatar.png')}
            style={{
              marginTop: hp('-5%'),
              alignSelf: 'center',
              height: hp('30%'),
              width: wp('45%'),
            }}
          />

          <View>
            <View
              style={[
                styles.line,
                {
                  position: 'absolute',
                  bottom: hp('37%'),
                  marginVertical: hp('2%'),
                },
              ]}></View>
            <Text style={styles.Modif}>Nom</Text>
            <Text style={styles.Modif2}>{user.nom}</Text>

            <View style={styles.sline}></View>

            <Text style={styles.Modif}>Prenom</Text>
            <Text style={styles.Modif2}>{user.prenom}</Text>

            <View style={styles.sline}></View>

            <Text style={styles.Modif}>E-mail</Text>
            <Text style={styles.Modif2}>{user.email}</Text>

            <View style={styles.sline}></View>

            <Text style={styles.Modif}>N° de téléphone</Text>
            <Text style={styles.Modif2}>{user.num}</Text>

            <View
              style={[
                styles.line,
                {
                  position: 'absolute',
                  bottom: hp('2%'),
                  marginVertical: hp('2%'),
                },
              ]}></View>
          </View>

          <View style={{bottom: hp('0%')}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfilScreen')}
              style={{width: wp('35%'), alignSelf: 'center'}}>
              <Image
                source={require('../assets/edit.png')}
                style={{
                  width: 150,
                  height: 70,
                  alignSelf: 'center',
                  top: hp('1%'),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View style={{position: 'absolute', bottom: hp('3%')}}>
            <View
              style={{
                borderBottomColor: '#EBEBEB',
                borderBottomWidth: 2,
                width: wp('100%'),
              }}></View>
            <TouchableOpacity
              style={{
                width: wp('8%'),
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
                  bottom: hp('0.5%'),
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

export default Editer;
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
  profile: {
    marginTop: hp('1.8%'),
    marginStart: wp('36%'),
    height: hp('3%'),
    width: wp('9%'),
    justifyContent: 'flex-start',
  },

  Modif: {
    color: '#407CEE',
    fontSize: wp('4%'),
    marginLeft: wp('6%'),
    marginBottom: hp('1%'),
    fontFamily: 'Montserrat',
    top: hp('-2%'),
  },

  Modif2: {
    color: '#000',
    fontSize: wp('4%'),
    marginLeft: wp('53%'),
    marginBottom: hp('1%'),
    top: hp('-5.5%'),
    fontFamily: 'Montserrat-Regular',
  },
  line: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('100%'),
  },
  sline: {
    borderBottomColor: '#EBEBEB',
    borderBottomWidth: 2,
    width: wp('40%'),
    height: hp('-1%'),
    alignSelf: 'flex-end',
    right: wp('6%'),
    top: hp('-5.5%'),
  },
});
