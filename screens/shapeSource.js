import React from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';

export default function shapeSource({long, lat}) {
  let dataSourceSave = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
        properties: {
          icon: 'localisation',
        },
        geometry: {
          type: 'Point',
          coordinates: [long, lat],
        },
      },
    ],
  };

  let icon = {
    iconImage: require('./assets/Logo.png'),
    iconAllowOverlap: true,
    iconSize: 0.07,
  };

  let viewItem = (
    <MapboxGL.ShapeSource
      id={'localisation'}
      hitbox={{width: 20, height: 20}}
      onPress={e => {
        console.log();
      }}
      shape={dataSourceSave}>
      <MapboxGL.SymbolLayer
        id={'localisation'}
        style={icon}></MapboxGL.SymbolLayer>
    </MapboxGL.ShapeSource>
  );
  return viewItem;
}
