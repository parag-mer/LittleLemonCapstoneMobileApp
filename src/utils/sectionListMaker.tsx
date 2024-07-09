export interface IData {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface ISectionData {
  title: any;
  data: IData[];
}

export function getSectionListData(data: any[]) {
  const mocData: ISectionData[] = [];
  data.forEach(ele => {
    let isMatched = false;
    mocData.forEach(ele1 => {
      if (ele1.title == ele.category) {
        ele1.data = [
          ...ele1.data,
          {
            id: ele.id,
            price: ele.price,
            name: ele.name,
            description: ele.description,
            image: ele.image,
          },
        ];
        isMatched = true;
      }
    });
    if (!isMatched) {
      mocData.push({
        title: ele.category,
        data: [
          {
            id: ele.id,
            price: ele.price,
            name: ele.name,
            description: ele.description,
            image: ele.image,
          },
        ],
      });
    }
  });
  return mocData;
}
