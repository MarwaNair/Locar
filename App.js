import React, {useState, useEffect, useMemo, useReducer} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import SplashScreen from './screens/SplashScreen';
import Editer from './screens/Editer';
import Mdp from './screens/Mdp';
import Parametre from './screens/Parametre';
import Profil from './screens/Profil';
import 'react-native-gesture-handler';
import QR from './screens/QR';
import ajouter from './screens/ajouter';
import First from './screens/ajouterPremierVoiture';
import voitures from './screens/voitures';
import modifier from './screens/modifier';
import localiser from './screens/localiser';
import Offlinemap from './screens/offlinemap';
import Load from './screens/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './components/Context';
import UserProvider from './components/UserProvider';
import CarProvider from './components/carProvider';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState('false');

  const initialLoginState = {
    user: {
      nom: '',
      prenom: '',
      email: '',
      num: '',
      password: '',
    },
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...prevState,
          user: action.user,
        };

      case 'REGISTER':
        return {
          ...prevState,
          user: action.user,
        };
      case 'LOGOUT':
        return {
          ...prevState,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  useEffect(async () => {
    let log;
    try {
      log = await AsyncStorage.getItem('isLoggedIn');

      if (log != null) setIsLoggedIn(log);
      else setIsLoggedIn('false');
    } catch (e) {
      console.log(e);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (email, password) => {
        let user;
        user = null;
        let userParsed;
        try {
          user = await AsyncStorage.getItem('user');
        } catch (e) {
          console.log(e);
        }
        userParsed = JSON.parse(user);

        let loginState =
          email == userParsed.email && password == userParsed.password;

        if (!loginState) {
          Alert.alert(
            'Utilisateur erroné!',
            'e-mail ou mot de passe invalide.',
            [{text: 'OK'}],
          );
        } else {
          try {
            await AsyncStorage.setItem('isLoggedIn', 'true');
          } catch (e) {
            console.log(e);
          }
          setIsLoggedIn('true');
        }

        dispatch({type: 'LOGIN', user: userParsed});
      },

      signUp: async user => {
        try {
          await AsyncStorage.setItem('isLoggedIn', 'true');
        } catch (e) {
          console.log(e);
        }
        try {
          let array = [];
          await AsyncStorage.setItem('car', JSON.stringify(array));
        } catch (e) {
          console.log(e);
        }
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user)).then(() => {
            setTimeout(() => {
              setIsLoggedIn('true');
            }, 2000);
          });
        } catch (e) {
          console.log(e);
        }

        dispatch({type: 'REGISTER', user: user});
      },
      signOut: async () => {
        try {
          await AsyncStorage.setItem('isLoggedIn', 'false');
        } catch (e) {
          console.log(e);
        }
        setIsLoggedIn('false');

        dispatch({type: 'LOGOUT'});
      },
    }),
    [],
  );

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <UserProvider>
          <CarProvider>
            <Stack.Navigator headerMode="none">
              {isLoggedIn == 'false' ? (
                <>
                  <Stack.Screen
                    name="OnBoardingScreen"
                    component={OnBoardingScreen}
                  />
                  <Stack.Screen name="LoginScreen" component={LoginScreen} />
                  <Stack.Screen name="SignInScreen" component={SignInScreen} />
                  <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                </>
              ) : (
                <>
                  <Stack.Screen name="HomeScreen" component={HomeScreen} />
                  <Stack.Screen name="LocaliserScreen" component={localiser} />
                  <Stack.Screen name="ParametreScreen" component={Parametre} />
                  <Stack.Screen name="ProfilScreen" component={Profil} />
                  <Stack.Screen name="EditScreen" component={Editer} />
                  <Stack.Screen name="MdpScreen" component={Mdp} />
                  <Stack.Screen name="VoituresScreen" component={voitures} />
                  <Stack.Screen name="AjouterScreen" component={ajouter} />
                  <Stack.Screen name="ModifierScreen" component={modifier} />
                  <Stack.Screen name="QRScreen" component={QR} />
                  <Stack.Screen name="LoadScreen" component={Load} />
                  <Stack.Screen name="MapScreen" component={Offlinemap} />
                </>
              )}
            </Stack.Navigator>
          </CarProvider>
        </UserProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
