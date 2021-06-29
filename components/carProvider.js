import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

 const CarContext = createContext();

const CarProvider = ({ children }) => {
   
  const [cars, Stor] = useState([]);

  const getCar = async () => {

    try {
    
      const car = await AsyncStorage.getItem('car')
     
      return car != null ? Stor(JSON.parse(car)) : null;
    } catch(e) {
      console.log('error')
    }
    
    console.log('Done.')
  
  }
 
  useEffect(() => {
   getCar();
  }, []);


  return (
    <CarContext.Provider value={{ cars, Stor, getCar}}>
      {children}
    </CarContext.Provider>
  );
};

export const usecars = () => useContext(CarContext);

export default CarProvider;