import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'little_lemon', location: 'default'});

export async function createTable() {
  return new Promise(async (resolve, reject) => {
    (await db).transaction(
      tx => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, name text, price text, description text, image text, category text);',
        );
      },
      reject,
      resolve,
    );
  });
}

export async function getMenuItems() {
  return new Promise<any[]>(async (resolve, reject) => {
    (await db).transaction(tx => {
      tx.executeSql(
        'select * from menuitems',
        [],
        (_, {rows}) => {
          let data_array = [];
          for (let i = 0; i < rows.length; i++) {
            data_array.push(rows.item(i));
          }
          resolve(data_array);
        },
        (_, error) => {
          reject(error);
          console.log('error in get menu items :: ', error);
          return true;
        },
      );
    });
  });
}

export async function saveMenuItems(
  menuItems: {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    category: string;
  }[],
) {
  console.log('data in save menu items :: ', menuItems);
  (await db).transaction(tx => {
    menuItems.forEach(ele => {
      const query =
        'INSERT INTO menuitems (id, name, price, description, image, category) VALUES (?, ?, ?, ?, ?, ?)';
      tx.executeSql(
        query,
        [
          ele?.id,
          ele?.name,
          ele?.price,
          ele?.description,
          ele?.image,
          ele?.category,
        ],
        (_, {rows}) => {
          console.log('Status : Success');
        },
        err => {
          console.log('inside foe each :: ', ele);
          console.log('Status : Failed', err);
        },
      );
    });
  });
}

export async function filterByQueryAndCategories(
  query: string,
  activeCategories: any[],
) {
  //   return activeCategories;
  return new Promise<any[]>(async (resolve, reject) => {
    (await db).transaction(tx => {
      const result: any = [];
      let qStr = '?';
      activeCategories.forEach(ele => {
        qStr += ', ?';
      });
      tx.executeSql(
        'select * from menuitems where category IN (' + qStr + ')',
        [...activeCategories],
        (_, {rows}) => {
          console.log('rows :: ', rows);
          for (let i = 0; i < rows.length; i++) {
            console.log(`rows.item(${i}) :: `, rows.item(i));
            if (rows.item(i).name.toLowerCase().includes(query.toLowerCase())) {
              result.push(rows.item(i));
            }
          }
          console.log('result :: ', result);
          resolve(result);
        },
        err => {
          reject(err);
        },
      );
    });
  });
}
