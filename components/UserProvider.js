import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

const UserProvider = ({children}) => {
  const [user, setUser] = useState({});

  const getUser = async () => {
    let User;
    User = null;
    let userParsed;
    try {
      User = await AsyncStorage.getItem('user').then(User => {
        if (User != null) {
          userParsed = JSON.parse(User);
          setUser(userParsed);
        } else {
          User = {
            nom: '',
            prenom: '',
            email: '',
            num: '',
            password: '',
          };
          setUser(User);
        }
        console.log('User', User);
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUser();
    console.log('user', user);
  }, []);

  return (
    <UserContext.Provider value={{user, setUser, getUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export default UserProvider;
