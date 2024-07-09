export const fetchData = async () => {
  const response = await fetch(
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json',
  );
  const data = await response.json();
  console.log('data :: ', data.menu);

  return data.menu;
};
