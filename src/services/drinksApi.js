const drinksAPI = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/list.php?${id}=list`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default drinksAPI;
