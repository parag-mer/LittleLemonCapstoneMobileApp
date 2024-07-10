import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export interface IuserData {
  name: string;
  email: string;
  image: string;
  lastName: string;
  phone: string;
  orderStatus: boolean;
  passwordChanges: boolean;
  specialOffers: boolean;
  newsletter: boolean;
}

export const getUserData = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user !== null) {
      return JSON.parse(user);
    }
  } catch (error: any) {
    Alert.alert(`Error while fetching user's data`, error);
  }
};

export const setUserData = (userData: IuserData) => {
  try {
    if (userData) {
      AsyncStorage.setItem('user', JSON.stringify(userData));
    }
  } catch (error: any) {
    Alert.alert(`Error while setting user's data`, error);
  }
};
