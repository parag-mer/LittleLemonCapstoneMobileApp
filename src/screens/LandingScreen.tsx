import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';

export const LandingScreen = ({navigation}: {navigation: any}) => {
  const userDataGetter = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      navigation.replace('home');
    } else {
      navigation.replace('onboarding');
    }
  };

  useEffect(() => {
    userDataGetter();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/landingScreenImage.png')}
        style={styles.image}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
