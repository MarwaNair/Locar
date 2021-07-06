import React, {useState} from 'react';
import {Component} from 'react';
import {
  StatusBar,
  TextInput,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import 'react-native-gesture-handler';
import {useUser} from '../components/UserProvider';
import {usecars} from '../components/carProvider';

const SPACING = 20;
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Hi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Maison: '',
      Modele: '',
      Couleur: '',
      Matricule: '',
      NumTlf: '+213',
    };
  }

  render() {
    global.car = this.state;

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#4F8EF2',
              fontSize: 16,
              marginTop: 10,
              marginRight: wp('5%'),
              marginLeft: 20,
            }}>
            {' '}
            Maison{'            '}
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#EBEBEB',
              borderBottomWidth: 1,
              color: '#707070',
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
            }}
            onChangeText={text => this.setState({Maison: text})}
            placeholder=" Maison                     "
            placeholderTextColor="#A2A1A1"
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#4F8EF2',
              fontSize: 16,
              marginTop: 10,
              marginRight: 60,
              marginLeft: 20,
            }}>
            {' '}
            Modèle{' '}
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#EBEBEB',
              borderBottomWidth: 1,
              color: '#707070',
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
            }}
            onChangeText={text => this.setState({Modele: text})}
            placeholderTextColor="#A2A1A1"
            placeholder="Modèle                     "
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#4F8EF2',
              fontSize: 16,
              marginTop: 10,
              marginRight: 57,
              marginLeft: 20,
            }}>
            {' '}
            Couleur{' '}
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#EBEBEB',
              borderBottomWidth: 1,
              color: '#707070',
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
            }}
            onChangeText={text => this.setState({Couleur: text})}
            placeholderTextColor="#A2A1A1"
            placeholder="Couleur                     "
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#4F8EF2',
              fontSize: 16,
              marginTop: 10,
              marginRight: 45,
              marginLeft: 20,
            }}>
            {' '}
            Matricule{' '}
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#EBEBEB',
              borderBottomWidth: 1,
              color: '#707070',
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
            }}
            onChangeText={text => this.setState({Matricule: text})}
            placeholderTextColor="#A2A1A1"
            placeholder="XXXX-XXX-XX          "
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              color: '#4F8EF2',
              fontSize: 16,
              marginTop: 10,
              marginRight: 35,
              marginLeft: 20,
            }}>
            {' '}
            N°téléphone
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: '#EBEBEB',
              borderBottomWidth: 1,
              color: '#707070',
              fontSize: 15,
              fontFamily: 'Montserrat-Regular',
            }}
            onChangeText={text => this.setState({NumTlf: text})}
            placeholderTextColor="#A2A1A1"
            placeholder="+213000000000     "
            value={this.state.NumTlf}
          />
        </View>
      </View>
    );
  }
}

export default function ajouter({navigation}) {
  const {user} = useUser();
  const {cars, Stor} = usecars();
  var array = cars;
  const [modalVisible, setModalVisible] = useState(false);
  const store = async CAR => {
    if (
      CAR.Maison == '' ||
      CAR.Modele == '' ||
      CAR.Matricule == '' ||
      CAR.NumTlf == '+213' ||
      CAR.Couleur == '' ||
      CAR.NumTlf == ''
    ) {
      Alert.alert(
        'Echec! ',
        'Veuillez entrer toutes les informations concernant votre voiture.',
        [{text: 'OK'}],
      );
    } else {
      if (CAR.NumTlf.charAt(0) == '0') {
        let num = CAR.NumTlf.slice(1);
        CAR.NumTlf = '+213' + num;
      }

      const Savecar = CAR;
      const existingcar = await AsyncStorage.getItem('car');
      let newCar = JSON.parse(existingcar);
      if (!newCar) {
        newCar = [];
      }
      newCar.push(Savecar);
      Stor(newCar);
      try {
        await AsyncStorage.setItem('car', JSON.stringify(newCar));
      } catch (e) {
        console.log(e);
      }
      console.log('Done.');
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false);
        navigation.navigate('QRScreen');
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.text}> {user.prenom}</Text>

        <Text style={styles.voiture}> {user.email}</Text>
      </View>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalView}>
          <Image source={require('./assets/succes.png')}></Image>
          <Text style={styles.modalText}>Voiture ajoutée avec succès</Text>
        </View>
      </Modal>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View
          style={{
            height: '100%',
            backgroundColor: '#fff',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              color: '#000',
              fontSize: wp('6%'),
              marginTop: '5%',
              marginBottom: '7%',
            }}>
            {' '}
            Ajouter une voiture
          </Text>

          <View
            style={{
              height: hp('40%'),
              width: wp('90%'),
              marginBottom: SPACING,
              backgroundColor: '#fff',
              borderRadius: 55,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.3,
              shadowRadius: 3.84,
              elevation: 3,

              marginLeft: 10,
              marginRight: 10,
            }}>
            <Text
              style={{
                color: '#000',
                fontSize: wp('4%'),
                marginLeft: 40,
                marginTop: 10,
              }}>
              {' '}
              Nouvelle voiture
            </Text>
            <View
              style={{
                height: 1.5,
                width: '100%',
                backgroundColor: '#EBEBEB',
                marginTop: '1%',
                marginBottom: '1%',
              }}></View>

            <Hi />
            <Image
              source={require('../assets/tesla.png')}
              style={{width: 120, height: 70, marginLeft: wp('60%')}}
            />
          </View>

          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('VoituresScreen')}>
              <Image
                source={require('../assets/Annuler2.png')}
                style={{
                  width: wp('40%'),
                  height: hp('10%'),
                  marginTop: hp('9%'),
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                store(global.car);
              }}>
              <Image
                source={require('../assets/confimer2.png')}
                style={{
                  width: wp('39%'),
                  height: hp('8.5%'),
                  marginTop: hp('9%'),
                  marginLeft: wp('19%'),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
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
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 3,
  },
  avatar: {
    marginTop: hp('2%'),
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
  },
  back: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    marginStart: wp('4%'),
    height: hp('2%'),
    width: wp('7.5%'),
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  modalView: {
    marginHorizontal: '15%',
    marginVertical: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
