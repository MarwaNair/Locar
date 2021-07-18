import React, {useEffect} from 'react';
import {
  View,
  Image,
  NativeModules,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  requestReadSMSPermission,
  startReadSMS,
  stopReadSMS,
} from 'react-native-sms-receiver/Receiver';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const Load = ({route, navigation}) => {
  const {num} = route.params;

  const startReadingMessages = async () => {
    const hasPermission = await requestReadSMSPermission();

    if (hasPermission) {
      startReadSMS((status: any, sms: any, error: any) => {
        /* on récupere le sms reçu*/
        if (status == 'success') {
          console.log(
            'Vous avez reçu un nouveau message :',
            sms,
          ); /*affichage de l'adresse du sms ainsi que son contenu */

          let smsParsed = JSON.parse(sms);
          //  console.log('numero', smsParsed.address);
          if (smsParsed.address == num) {
            //  console.log('dfgh', smsParsed.message);
            let pos = smsParsed.message;
            console.log('Position :', pos);
            stopReadSMS();
            navigation.replace('MapScreen', {
              latitude: pos.latitude,
              longitude: pos.longitude,
            });
          }
        }
      });
    }
  };

  useEffect(() => {
    startReadingMessages();
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
        source={require('../assets/load.png')}
        style={styles.logo}
        animation="pulse"
        iterationCount="infinite"
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Localisation en cours</Text>

        <Text style={styles.text}>. . .</Text>
      </View>
    </View>
  );
};

export default Load;
const height_logo = hp('35%');
const width_logo = wp('70%');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  textContainer: {
    width: wp('60%'),
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width_logo,
    height: height_logo,
    alignSelf: 'center',
  },
  text: {
    color: '#000',
    fontFamily: 'Montserrat-Bold',
    fontSize: wp('4%'),
  },
});
