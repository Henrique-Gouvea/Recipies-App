import apiRequestByLink from '../services/apiRequestByLink';

export default function SearchFilter(values) {
  const {
    option,
    setRecipeFoods,
    setRecipeDrinks,
    inputValue,
    radioValue,
  } = values;

  async function API(param) {
    const ForD = option.includes('foods') ? 'meals' : 'drinks';
    const SorF = param === 'i' ? 'filter' : 'search';
    const url = option.includes('foods') ? 'themealdb' : 'thecocktaildb';

    apiRequestByLink(`https://www.${url}.com/api/json/v1/1/${SorF}.php?${param}=${inputValue}`)
      .then((data) => (ForD === 'meals'
        ? setRecipeFoods(data[ForD])
        : setRecipeDrinks(data[ForD])));
  }

  switch (true) {
  case radioValue === 'ingredientID':
    API('i');
    break;
  case radioValue === 'nameSearchID':
    API('s');
    break;
  case radioValue === 'firstLetterID' && inputValue.length > 1:
    global.alert('Your search must have only 1 (one) character');
    break;
  default:
    API('f');
  }
}
