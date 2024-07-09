import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {Texts} from '../utils/AppConstants';

export const Title = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Little Lemon</Text>
      <View>
        <Text style={styles.subtitle}>Chicago</Text>
        <View style={styles.subContainer}>
          <Text style={styles.subContainerText}>{Texts.titleText}</Text>
          <Image
            source={require('../assets/greekSalad.jpg')}
            style={styles.subContainerImage}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    backgroundColor: '#495e57',
    padding: 10,
    width: '100%',
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  subContainerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subContainerImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#f4ce13',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
});
