const filterApi = async (id) => {
  if (id.categorie) {
    let url = '';
    if (id.type === 'food') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id.categorie}`;
    } else url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id.categorie}`;
    const response = await fetch(url);
    const data = await response.json();
    if (id.type === 'food') {
      return data.meals;
    }
    return data.drinks;
  }
};

export default filterApi;
