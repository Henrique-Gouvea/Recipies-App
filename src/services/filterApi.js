const filterApi = async (id) => {
  if (id) {
    console.log(id);
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${id}`;
    console.log(url);
    const response = await fetch(url);
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;
  }
};

export default filterApi;
