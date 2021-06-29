import * as React from 'react';
import {
  Image,
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import {useUser} from '../components/UserProvider';
import {usecars} from '../components/carProvider';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 6;

export default function voitures({navigation}) {
  const {cars, Stor, getCar} = usecars();
  const {user} = useUser();
  const scrollY = React.useRef(new Animated.Value(0)).current;

  getCar();

  const DATA = cars.map(car => {
    return {
      key: car.Matricule,
      Maison: car.Maison,
      Modele: car.Modele,
      Couleur: car.Couleur,
      Matricule: car.Matricule,
      NumTlf: car.NumTlf,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.text}> {user.prenom}</Text>
        <Image source={require('../assets/car.png')} style={styles.car} />
        <Text style={styles.voiture}> Voitures</Text>
      </View>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Animated.FlatList
          contentContainerStyle={{padding: 30}}
          data={DATA}
          keyExtractor={item => item.key}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          renderItem={({item, index}) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <Animated.View
                style={{
                  flexDirection: 'row',
                  padding: 20,
                  marginBottom: SPACING,
                  backgroundColor: '#fff',
                  borderRadius: 35,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 6,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 3.84,
                  elevation: 3,
                  transform: [{scale}],
                }}>
                <View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      marginBottom: 4,
                      color: '#4F8EF2',
                      marginTop: -10,
                    }}>
                    {' '}
                    Maison{'          '}
                    <Text style={{color: '#707070'}}>{item.Maison} </Text>{' '}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      width: '60%',
                      backgroundColor: '#EBEBEB',
                      marginLeft: 90,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      marginBottom: 4,
                      color: '#4F8EF2',
                      marginTop: 10,
                    }}>
                    {' '}
                    Modèle{'          '}
                    <Text style={{color: '#707070'}}>{item.Modele} </Text>{' '}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      width: '60%',
                      backgroundColor: '#EBEBEB',
                      marginLeft: 90,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      marginBottom: 4,
                      color: '#4F8EF2',
                      marginTop: 10,
                    }}>
                    {' '}
                    Couleur{'         '}
                    <Text style={{color: '#707070'}}>{item.Couleur} </Text>{' '}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      width: '60%',
                      backgroundColor: '#EBEBEB',
                      marginLeft: 90,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      marginBottom: 4,
                      color: '#4F8EF2',
                      marginTop: 10,
                    }}>
                    {' '}
                    Matricule{'      '}
                    <Text style={{color: '#707070'}}>
                      {item.Matricule}{' '}
                    </Text>{' '}
                  </Text>
                  <View
                    style={{
                      height: 1,
                      width: '60%',
                      backgroundColor: '#EBEBEB',
                      marginLeft: 90,
                    }}></View>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      color: '#4F8EF2',
                      marginTop: 10,
                    }}>
                    {' '}
                    N°téléphone{'   '}
                    <Text style={{color: '#707070'}}>{item.NumTlf} </Text>
                    {'           '}
                  </Text>
                </View>

                <Image
                  source={require('../assets/tesla.png')}
                  style={{
                    width: wp('21%'),
                    height: hp('9%'),
                    marginLeft: wp('5%'),
                    marginTop: hp('14%'),
                  }}
                />
              </Animated.View>
            );
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ModifierScreen')}>
            <Image
              source={require('../assets/editer.png')}
              style={{width: 60, height: 60, marginLeft: wp('2%')}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('AjouterScreen')}>
            <Image
              source={require('../assets/add.png')}
              style={{width: 60, height: 60, marginLeft: wp('63%')}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footer}></View>
      <TouchableOpacity onPress={() => navigation.navigate('ParametreScreen')}>
        <View style={{backgroundColor: '#fff'}}>
          <Image source={require('../assets/back.png')} style={styles.back} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
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
    shadowRadius: 3.8,
    elevation: 3,
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
  voiture: {
    marginTop: hp('-3%'),
    marginStart: wp('47%'),
    fontSize: wp('5%'),
    fontFamily: 'Montserrat-Bold',
    color: '#FFFFFF',
  },
  car: {
    marginTop: hp('1.8%'),
    marginStart: wp('36%'),
    height: hp('3%'),
    width: wp('9%'),
    justifyContent: 'flex-start',
  },
  footer: {
    height: 2,
    width: wp('100%'),
    backgroundColor: '#EBEBEB',
  },
  back: {
    marginTop: hp('1%'),

    marginStart: wp('4%'),
    height: hp('1.5%'),
    width: wp('5%'),
  },
});
