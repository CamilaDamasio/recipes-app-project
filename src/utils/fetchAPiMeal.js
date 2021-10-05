const endPoint = (type, search) => {
  let END_POINT = '';

  switch (type) {
  case 'Ingrediente':
    END_POINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
    return END_POINT;

  case 'Nome':
    END_POINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
    return END_POINT;

  case 'Primeira letra':
    END_POINT = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    return END_POINT;

  default:
    return null;
  }
};

const fetchAPIMeal = async (search, type) => {
  const END_POINT = endPoint(type, search);

  const response = await fetch(END_POINT);
  const { meals } = await response.json();
  return meals;
};

export default fetchAPIMeal;
