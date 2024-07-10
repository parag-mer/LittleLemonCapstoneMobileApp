import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../components/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {IuserData, getUserData, setUserData} from '../utils/userData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ProfileScreen = ({navigation}: {navigation: any}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userImage, setUserImage] = useState(require('../assets/user.png'));
  const [emailNotifications, setEmailNotifications] = useState({
    orderStatus: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
  });

  const onCheckboxValueChange = (key: string) => {
    switch (key) {
      case 'orderStatus':
        setEmailNotifications({
          ...emailNotifications,
          orderStatus: !emailNotifications.orderStatus,
        });
        break;

      case 'passwordChanges':
        setEmailNotifications({
          ...emailNotifications,
          passwordChanges: !emailNotifications.passwordChanges,
        });
        break;

      case 'specialOffers':
        setEmailNotifications({
          ...emailNotifications,
          specialOffers: !emailNotifications.specialOffers,
        });
        break;

      case 'newsletter':
        setEmailNotifications({
          ...emailNotifications,
          newsletter: !emailNotifications.newsletter,
        });
        break;

      default:
        break;
    }
  };

  const userDataGetter = async () => {
    const data = await getUserData();
    setFirstName(data?.name);
    setLastName(data?.lastName);
    setEmail(data?.email);
    setPhoneNumber(data?.phone);
    setEmailNotifications({
      orderStatus: data?.orderStatus,
      newsletter: data?.newsletter,
      passwordChanges: data?.passwordChanges,
      specialOffers: data?.specialOffers,
    });
  };

  const onLogout = () => {
    Alert.alert('LOGOUT!', 'Your all data will be deleted', [
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          await navigation.reset({
            index: 0,
            routes: [{name: 'onboarding'}],
          });
        },
      },
      {
        text: 'Cancel',
        style: 'cancel',
        isPreferred: true,
      },
    ]);
  };

  const onDiscardChanges = () => {
    navigation.goBack();
  };

  const onSaveChanges = async () => {
    const userData: IuserData = {
      name: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber,
      image: userImage,
      orderStatus: emailNotifications.orderStatus,
      newsletter: emailNotifications.newsletter,
      passwordChanges: emailNotifications.passwordChanges,
      specialOffers: emailNotifications.specialOffers,
    };
    setUserData(userData);
    Alert.alert('Successfull', 'All changes saved successfully');
    await userDataGetter();
  };

  useEffect(() => {
    userDataGetter();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header screen="profile" navigation={navigation} />
      <KeyboardAwareScrollView
        style={styles.innerContainer}
        keyboardDismissMode="on-drag">
        <View>
          <Text style={styles.title}>Personal Information</Text>
          <Text style={{color: 'gray'}}>Avatar</Text>
          <View style={styles.avatarInner}>
            <Image
              source={require('../assets/user.png')}
              style={styles.userImage}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>First name</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your first name"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>Last name</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your last name"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>Email</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={{color: 'gray'}}>Phone number</Text>
            <TextInput
              style={styles.field}
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        <View>
          <Text style={styles.title}>Email Notifications</Text>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onCheckboxValueChange('orderStatus')}>
            <MaterialCommunityIcons
              name={
                emailNotifications.orderStatus
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={24}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Order status</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onCheckboxValueChange('passwordChanges')}>
            <MaterialCommunityIcons
              name={
                emailNotifications.passwordChanges
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={24}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Password Changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onCheckboxValueChange('specialOffers')}>
            <MaterialCommunityIcons
              name={
                emailNotifications.specialOffers
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={24}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Special Offers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => onCheckboxValueChange('newsletter')}>
            <MaterialCommunityIcons
              name={
                emailNotifications.newsletter
                  ? 'checkbox-marked'
                  : 'checkbox-blank-outline'
              }
              size={24}
              style={styles.checkbox}
            />
            <Text style={styles.checkboxText}>Newsletter</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={{fontWeight: 'bold'}}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.changesBtnContainer}>
          <TouchableOpacity
            style={[
              styles.formChangesBtn,
              {borderWidth: 1, borderColor: '#495E57'},
            ]}
            onPress={onDiscardChanges}>
            <Text style={{color: 'gray', fontWeight: 'bold'}}>
              Discard Changes
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.formChangesBtn, {backgroundColor: '#495E57'}]}
            onPress={onSaveChanges}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              Save Changes
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '100%',
    padding: 12,
  },
  userImage: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 5,
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    color: '#495E57',
  },
  checkboxText: {
    marginLeft: 5,
  },
  logoutBtn: {
    width: '95%',
    backgroundColor: '#f4ce13',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },

  formChangesBtn: {
    width: '40%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  changesBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 40,
  },
});
