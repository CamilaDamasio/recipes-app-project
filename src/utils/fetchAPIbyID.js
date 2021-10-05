export const foodById = async (id) => {
  const rawApiData = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const ApiData = await rawApiData.json();
  const { meals } = ApiData;
  return meals[0];
};

export const drinkById = async (id) => {
  const rawApiData = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
  );
  const ApiData = await rawApiData.json();
  const { drinks } = ApiData;
  return drinks[0];
};

// eu to fazendo esses fetchs aqui pq eu tava conseguindo usar elas nas fetchAPIMeals/Cocktails, se tiver uma forma melhor me
// explique como e eu mudo, ou se quiser mudar voce mesmo fique a vontade :)
