import React, {Component, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from 'react-native';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';
import ShapeSource from './shapeSource';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiYm91Y2hyYWNoZXRpYmkiLCJhIjoiY2tvN2VtYTY2MG9nbDJvcGRmbnp1eW81dSJ9.S-Mr6rb9gaF4_jQuB3cQjg',
);

//Pour eviter le message d'erreur normal due au Zoom
Logger.setLogCallback(log => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },

  container: {
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },

  imageContainer: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  mapContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF',
  },

  footer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: '40%',
    position: 'absolute',
    bottom: 0,
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
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default class Offlinemap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: '',
      modalVisible: false,
    };
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false,
      });
    }, 1500);
  };

  componentDidMount = () => {
    this.showModal();
    this.onTakeSnapshot();
  };

  async onTakeSnapshot() {
    const uri = await this.map.takeSnap(false).then(uri => {
      this.setState({uri});
    });
  }

  render() {
    const LONG = Number(this.props.route.params.longitude);
    const LAT = Number(this.props.route.params.latitude);
    return (
      <View style={{flex: 1}}>
        <View style={styles.mapContainer}>
          <Modal
            animationType="slide"
            transparent
            visible={this.state.modalVisible}>
            <View style={styles.modalView}>
              <Image source={require('./assets/succes.png')}></Image>
              <Text style={styles.modalText}>
                Voiture localisée avec succès
              </Text>
            </View>
          </Modal>
          <MapboxGL.MapView
            ref={ref => (this.map = ref)}
            style={styles.map}
            logoEnabled={false}>
            <ShapeSource long={LONG} lat={LAT}></ShapeSource>
            <MapboxGL.Camera
              ref={ref => (this.camera = ref)}
              zoomLevel={10}
              pitch={45}
              centerCoordinate={[LONG, LAT]}>
              {this.state.uri ? (
                <Image
                  resizeMode="contain"
                  style={{flex: 1, backgroundColor: 'green'}}
                  source={{uri: this.state.uri}}></Image>
              ) : null}
            </MapboxGL.Camera>
          </MapboxGL.MapView>
        </View>
        <BottomSheet
          keyboardAware
          bottomSheerColor="#ffffff"
          ref="BottomSheet"
          initialPosition={'5%'}
          snapPoints={['30%', '5%']}
          isRoundBorderWithTipHeader={true}
          containerStyle={{borderTopLeftRadius: 45, borderTopRightRadius: 45}}
          body={
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('LocaliserScreen')
                  }
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    height: '45%',
                    bottom: '-40%',
                  }}>
                  <Image
                    source={require('./assets/home.png')}
                    style={{width: '70%', alignSelf: 'center'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={{flex: 1}}>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                  }}></Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                  }}>
                  Latitude: {LAT}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                  }}></Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                  }}>
                  Longitude: {LONG}
                </Text>
              </View>

              <View style={{flex: 1}}>
                <TouchableOpacity
                  onPress={() =>
                    RNImmediatePhoneCall.immediatePhoneCall('1548')
                  }
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: '80%',
                    height: '45%',
                    bottom: '-40%',
                  }}>
                  <Image
                    source={require('./assets/sos.png')}
                    style={{width: '70%', alignSelf: 'center'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      </View>
    );
  }
}
