import {Image, StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const Header = ({
  navigation,
  screen,
}: {
  navigation?: any;
  screen?: string;
}) => {
  return (
    <View style={styles.container}>
      <AntDesign
        name="arrowleft"
        size={30}
        color={screen !== 'profile' ? 'transparent' : 'black'}
        style={styles.iconStyle}
        disabled={screen !== 'profile'}
        onPress={() => navigation.goBack()}
      />
      <Image
        source={require('../assets/headerImage.png')}
        style={styles.imageStyle}
      />
      <FontAwesome6
        name="user"
        size={30}
        style={{marginRight: 10}}
        onPress={() => navigation.navigate('profile')}
        color={screen !== 'home' ? 'transparent' : 'black'}
        disabled={screen !== 'home'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconStyle: {
    marginLeft: 10,
  },
});
