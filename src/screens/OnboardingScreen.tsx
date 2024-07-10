import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Title} from '../components/Title';
import {Header} from '../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EMAIL_REGEX} from '../utils/AppConstants';

export const OnboardingScreen = ({navigation}: {navigation: any}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = async () => {
    if (name && email) {
      try {
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            name: name,
            email: email,
          }),
        );
        await navigation.navigate('home');
      } catch (error) {
        console.log('error in onSubmit :: ', error);
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView keyboardDismissMode="on-drag">
        <Header />
        <Title />
        <View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Name</Text>
            <TextInput
              placeholder="Enter your name"
              style={styles.field}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              style={styles.field}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {email.length > 0 && !EMAIL_REGEX.test(email) && (
              <Text style={styles.errorText}>Invalid email</Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            !email || !name || !EMAIL_REGEX.test(email)
              ? styles.buttonDisabled
              : styles.buttonEnabled,
          ]}
          onPress={onSubmit}
          disabled={!email || !name}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  fieldContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'gray',
  },
  field: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 30,
    marginRight: 20,
    alignItems: 'center',
    width: 150,
    alignSelf: 'flex-end',
  },
  buttonEnabled: {
    backgroundColor: '#495e57',
  },
  buttonDisabled: {
    backgroundColor: '#d3d3d3',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF3131',
    marginTop: 3,
    marginLeft: 3,
  },
});
