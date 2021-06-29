import * as React from 'react';
import {Component} from 'react';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const store = async CAR => {
  const Savecar = CAR;
  const existingcar = await AsyncStorage.getItem('car');
  let newCar = JSON.parse(existingcar);
  if (!newCar) {
    newCar = [];
  }
  newCar.push(Savecar);

  try {
    await AsyncStorage.setItem('car', JSON.stringify(newCar));
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

export const Delete = async (array, index) => {
  array.splice(index, 1);

  try {
    await AsyncStorage.setItem('car', JSON.stringify(array));
  } catch (e) {
    console.log(e);
  }

  console.log('Deleted');
};
