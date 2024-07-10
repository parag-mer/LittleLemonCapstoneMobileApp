import {
  Dimensions,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../components/Header';
import {Title} from '../components/Title';
import {Searchbar} from 'react-native-paper';
import {useEffect, useState} from 'react';
import {
  createTable,
  filterByQueryAndCategories,
  getMenuItems,
  saveMenuItems,
} from '../utils/dbService';
import {fetchData} from '../utils/fetchData';
import {ISectionData, getSectionListData} from '../utils/sectionListMaker';
import {SectionItem} from '../utils/SectionItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IuserData, getUserData} from '../utils/userData';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const [search, setSearch] = useState('');
  const [sections, setSections] = useState([
    {name: 'starters', selected: false},
    {name: 'mains', selected: false},
    {name: 'desserts', selected: false},
  ]);
  const [sectionListData, setSectionListData] = useState<ISectionData[]>([]);
  const [userData, setUserData] = useState<IuserData>();

  const onFilterSelect = (index: number) => {
    const newSelection = [...sections];
    newSelection[index].selected = !newSelection[index].selected;
    setSections(newSelection);
  };

  const RestaurantDataGetter = async () => {
    try {
      console.log('in try block');
      await createTable();
      let dbData = await getMenuItems();
      console.log('dbData', dbData);
      if (!dbData.length) {
        let data = await fetchData();
        await saveMenuItems(data);
        dbData = await getMenuItems();
      }
      const data = await getSectionListData(dbData);
      console.log('data after getSectionListData :: ', data);
      setSectionListData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const userDataGetter = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  useEffect(() => {
    RestaurantDataGetter();
    userDataGetter();
  }, []);

  const categorySelector = async () => {
    let activeCategories = sections.filter(section => section.selected);

    if (activeCategories.length == 0) {
      activeCategories = sections;
    }
    const selected = activeCategories.map(a => a.name);
    console.log('selected', selected);

    try {
      const menuItems = await filterByQueryAndCategories(search, selected);
      const sectionListData = await getSectionListData(menuItems);
      setSectionListData(sectionListData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    categorySelector();
  }, [sections, search]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        screen="home"
        navigation={navigation}
        userImage={userData?.image}
      />
      <Title />
      <Searchbar
        value={search}
        onChangeText={setSearch}
        style={styles.searchField}
        iconColor="white"
        placeholder="Search"
        placeholderTextColor={'white'}
        inputStyle={{color: 'white'}}
      />
      <Text style={styles.orderTitle}>ORDER FOR DELIVERY!</Text>
      <View style={styles.filtersContainer}>
        {sections.map((section, index) => (
          <TouchableOpacity
            style={[
              styles.filterBtn,
              {backgroundColor: section.selected ? '#495E57' : '#edefee'},
            ]}
            onPress={() => onFilterSelect(index)}
            key={index}>
            <Text
              style={{
                color: section.selected ? '#edefee' : '#495E57',
                fontWeight: 'bold',
              }}>
              {section.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <SectionList
        sections={sectionListData}
        renderItem={({item}) => <SectionItem item={item} key={item.id} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchField: {
    backgroundColor: '#495E57',
    borderRadius: 0,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  filterBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: Dimensions.get('window').width / 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  filterBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
