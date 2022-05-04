import { checkProgress } from '../services/utilities';

function SaveProgress(value, { target }) {
  const { id, option, progress, setProgress } = value;
  const ForD = option === 'foodsinprogress' ? 'meals' : 'cocktails';
  function saveStorageProgress(obj) {
    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }

  const { meals, cocktails } = progress;
  let remove = [];
  switch (true) {
  case !target.checked:
    remove = progress[ForD][id].filter((el) => el !== target.value);
    saveStorageProgress({ ...progress, [ForD]: { [id]: remove } });
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
