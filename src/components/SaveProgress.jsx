import { checkProgress } from '../services/utilities';

function SaveProgress(value, ForD, { target }) {
  const { id, progress, setProgress } = value;
  const { meals, cocktails } = progress;
  let remove = [];

  function saveStorageProgress(obj) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }

  switch (true) {
  case !target.checked:
    remove = progress[ForD][id].filter((el) => el !== target.value);
    if (remove.length === 0) {
      const arr = { ...progress };
      delete arr[ForD][id];
      saveStorageProgress({ ...arr });
    } else {
      saveStorageProgress({ ...progress, [ForD]: { [id]: remove } });
    }
    break;
  case checkProgress(meals, id) || checkProgress(cocktails, id):
    saveStorageProgress({ ...progress,
      [ForD]: { ...progress[ForD],
        [id]: [...progress[ForD][id], target.value] } });
    break;
  default:
    saveStorageProgress({ ...progress,
      [ForD]: { ...progress[ForD], [id]: [target.value] } });
  }
  setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
}

export default SaveProgress;
