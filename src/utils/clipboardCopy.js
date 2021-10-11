const copy = require('clipboard-copy');

const clipboardCopy = (type, id) => {
  copy(`${window.location.origin}/recipes-app-project/#/${type}s/${id}`).then(() => {
    document.querySelector(`#copyMessage${id}`).innerHTML = 'Link copiado!';
  });
};

export default clipboardCopy;
