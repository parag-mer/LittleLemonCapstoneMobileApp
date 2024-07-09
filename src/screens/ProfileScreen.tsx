import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../components/Header';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export const ProfileScreen = ({navigation}: {navigation: any}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header screen="profile" navigation={navigation} />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Personal Information</Text>
        <View>
          <Text style={{color: 'gray'}}>Avatar</Text>
          <View style={styles.avatarInner}>
            <FontAwesome6 name="user" size={40} color={'black'} />
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: '#495E57', borderRadius: 10},
              ]}>
              <Text style={{color: 'white'}}>Change</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {borderColor: '#495E57', borderWidth: 1}]}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>First name</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your first name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>Last name</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your last name"
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>Email</Text>
            <TextInput style={styles.field} placeholder="Enter your email" />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>Phone number</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your phone number"
            />
          </View>
          <View>
            <Text style={styles.title}>Email Notifications</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  button: {
    width: 100,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  field: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  fieldContainer: {
    marginVertical: 15,
  },
});
