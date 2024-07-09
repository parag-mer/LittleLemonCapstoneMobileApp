import {Image, StyleSheet, Text, View} from 'react-native';
import {IData} from './sectionListMaker';

export const SectionItem = ({item}: {item: IData}) => {
  console.log('title in section item :: ', item);
  return (
    <View style={styles.container}>
      <View style={{width: '70%'}}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  price: {
    fontSize: 16,
    color: 'gray',
    fontWeight: 'bold',
    marginTop: 15,
  },
  description: {
    fontSize: 14,
  },
});
