export function getVideoID(url) {
  return url.split(/(v=|youtu\.be\/)/)[2];
}

export function measure(index, details) {
  const measureIndex = `${details[`strMeasure${index + 1}`]}`;
  return measureIndex !== 'null' ? ` - ${measureIndex}` : '';
}

export function shareLink(setCopied) {
  navigator.clipboard.writeText(window.location.href.replace(/\/in-progress/g, ''))
    .then(() => {
      setCopied(true);
    });
}

export function storageFavorites(detail, option) {
  const lessOne = -1;
  return {
    id: detail.idMeal || detail.idDrink,
    type: option.slice(0, lessOne),
    nationality: detail.strArea || '',
    category: detail.strCategory,
    alcoholicOrNot: detail.strAlcoholic || '',
    name: detail.strMeal || detail.strDrink,
    image: detail.strMealThumb || detail.strDrinkThumb,
  };
}

export function checkProgress(opt, ID) {
  return Object.keys(opt).some((item) => item === ID);
}

export function checkCheck(prog, { target }, ID) {
  return Object.keys(prog.meals).some((elem) => elem[ID] === target.value);
}
