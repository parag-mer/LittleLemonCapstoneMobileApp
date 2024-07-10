import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const Header = ({
  navigation,
  screen,
  userImage,
}: {
  navigation?: any;
  screen?: string;
  userImage?: string;
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
      <TouchableOpacity
        onPress={() => navigation.navigate('profile')}
        disabled={screen !== 'home'}
        style={{marginRight: 10, width: 30}}>
        {screen === 'home' && (
          <Image
            source={userImage ? userImage : require('../assets/user.png')}
            style={styles.userImage}
          />
        )}
      </TouchableOpacity>
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
  userImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});
