import React, {Component, useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';
import ShapeSource from './shapeSource';
import BottomSheet from 'react-native-bottomsheet-reanimated';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

const MAPBOX_VECTOR_TILE_SIZE = 512;

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
      name: 'alger',
      offlineRegion: null,
      offlineRegionStatus: null,
      modalVisible: false,
    };

    this.onDownloadProgress = this.onDownloadProgress.bind(this);
    this.onDidFinishLoadingStyle = this.onDidFinishLoadingStyle.bind(this);

    this.onResume = this.onResume.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onStatusRequest = this.onStatusRequest.bind(this);
  }
  componentDidMount = () => {
    this.showModal();
  };
  componentWillUnmount() {
    // avoid setState warnings if we back out before we finishing downloading
    // MapboxGL.offlineManager.deletePack('alger');
    MapboxGL.offlineManager.unsubscribe('alger');
  }

  async onDidFinishLoadingStyle() {
    const {width, height} = Dimensions.get('window');

    const options = {
      name: this.state.name,
      styleURL: MapboxGL.StyleURL.Street,
      bounds: [
        [2.7774, 36.5652],
        [3.431, 36.8563],
      ],
      minZoom: 0,
      maxZoom: 15,
    };

    const offlinePack = await MapboxGL.offlineManager
      .getPack('alger')
      .then(async offlinePack => {
        console.log(offlinePack);
        if (!offlinePack) {
          // start download
          await MapboxGL.offlineManager.createPack(
            options,
            this.onDownloadProgress,
          );
          Alert.alert(
            'Téléchargement de la MAP en cours !',
            'Ne quittez pas cet ecran avant la fin du téléchargement.',
            [{text: 'OK'}],
          );
        }
      });
  }

  onDownloadProgress(offlineRegion, offlineRegionStatus) {
    this.setState({
      name: offlineRegion.name,
      offlineRegion,
      offlineRegionStatus,
    });
  }

  onResume() {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.resume();
    }
  }

  onPause() {
    if (this.state.offlineRegion) {
      this.state.offlineRegion.pause();
    }
  }

  async onStatusRequest() {
    if (this.state.offlineRegion) {
      const offlineRegionStatus = await this.state.offlineRegion.status();
      Alert.alert('Get Status', JSON.stringify(offlineRegionStatus, null, 2));
    }
  }

  _formatPercent() {
    if (!this.state.offlineRegionStatus) {
      return '0%';
    }
    return Math.round(this.state.offlineRegionStatus.percentage / 100);
  }

  _getRegionDownloadState(downloadState) {
    switch (downloadState) {
      case MapboxGL.OfflinePackDownloadState.Active:
        return 'Active';
      case MapboxGL.OfflinePackDownloadState.Complete:
        return 'Complete';
      default:
        return 'Inactive';
    }
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

  render() {
    var LONG = Number(this.props.route.params.longitude);
    var LAT = Number(this.props.route.params.latitude);
    const {offlineRegionStatus} = this.state;
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
            ref={c => (this._map = c)}
            onPress={this.onPress}
            onDidFinishLoadingMap={this.onDidFinishLoadingStyle}
            style={styles.map}
            logoEnabled={false}>
            <ShapeSource long={LONG} lat={LAT}></ShapeSource>
            <MapboxGL.Camera
              zoomLevel={10}
              centerCoordinate={[LONG, LAT]}
              pitch={40}
            />
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
                    bottom: '-10%',
                  }}>
                  <Image
                    source={require('./assets/home.png')}
                    style={{width: '70%', alignSelf: 'center'}}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View style={{width: wp('40%'), bottom: -15}}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                    marginBottom: 4,
                  }}>
                  Latitude: {LAT}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center',
                    marginBottom: 4,
                  }}>
                  Longitude: {LONG}
                </Text>
                {offlineRegionStatus !== null ? (
                  <Text
                    style={{
                      fontFamily: 'Montserrat-Regular',
                      textAlign: 'center',
                    }}>
                    Téléchargement: {Math.round(offlineRegionStatus.percentage)}
                    %
                  </Text>
                ) : null}
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
                    bottom: '-10%',
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
