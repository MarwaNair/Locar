import * as React from 'react';
import {
  StatusBar,
  FlatList,
  ToastAndroid,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SendSMS from 'react-native-sms-x';
import 'react-native-gesture-handler';
import {usecars} from '../components/carProvider';
import {useUser} from '../components/UserProvider';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 6;

export default function localiser({navigation}) {
  const {user} = useUser();
  const {cars} = usecars();

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

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ParametreScreen');
          }}>
          <Image
            source={require('../assets/menu.png')}
            style={{
              height: 20,
              width: 20,
              marginLeft: wp('90%'),
              marginTop: hp('1.5%'),
            }}
          />
        </TouchableOpacity>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.text}> {user.prenom}</Text>

        <Text style={styles.voiture}> {user.email}</Text>
      </View>
      <View style={{backgroundColor: '#FFF', alignItems: 'center'}}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: '#000',
            fontSize: wp('8%'),
            marginTop: 10,
          }}>
          {' '}
          Vos voitures
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: '#000',
            fontSize: wp('4%'),
          }}>
          {' '}
          Clickez sur la flèche pour localiser
        </Text>
        <Text
          style={{
            fontFamily: 'Montserrat-Regular',
            color: '#000',
            fontSize: wp('4%'),
          }}>
          {' '}
          la voiture choisie !
        </Text>
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
                  <TouchableOpacity
                    onPress={() => {
                      SendSMS.send(
                        index + 1,
                        item.NumTlf,
                        item.Matricule,
                        msg => {
                          ToastAndroid.show(msg.toString(), ToastAndroid.SHORT);
                        },
                      );
                      navigation.navigate('LoadScreen', {num: item.NumTlf});
                    }}>
                    <Image
                      source={require('../assets/flesh.png')}
                      style={{
                        height: 35,
                        width: 35,
                        marginLeft: wp('65%'),
                        marginTop: -8,
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      marginBottom: 4,
                      color: '#4F8EF2',
                      marginTop: -10,
                    }}>
                    {' '}
                    Maison{'         '}
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
                    Modèle{'         '}
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
                    Couleur{'        '}
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
                    Matricule{'     '}
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
                    {'              '}
                  </Text>
                </View>

                <Image
                  source={require('../assets/tesla.png')}
                  style={{
                    width: wp('21%'),
                    height: hp('9%'),
                    marginLeft: wp('-10%'),
                    marginTop: hp('19%'),
                  }}
                />
              </Animated.View>
            );
          }}
        />
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
      height: 20,
      width: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  avatar: {
    marginTop: hp('-0.5%'),
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
    marginTop: hp('1%'),
    marginStart: wp('37%'),
    fontSize: wp('3.4%'),
    fontFamily: 'Montserrat-Regular',
    color: '#FFFFFF',
  },

  footer: {
    height: 2,
    width: wp('100%'),
    backgroundColor: '#EBEBEB',
  },
  back: {
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    marginStart: wp('4%'),
    height: hp('1.5%'),
    width: wp('6%'),
  },
});
