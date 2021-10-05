const functionSetFavoriteFood = (recipeRender, id, setHeartColor) => {
  const { strMealThumb, strMeal, strCategory, strArea } = recipeRender[0];

  const favoriteRecipeToken = {
    id,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb,
  };

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  if (favoriteRecipes.length > 0
    && favoriteRecipes.some((item) => item.id === favoriteRecipeToken.id)) {
    const test2 = favoriteRecipes
      .filter((recipe) => recipe.id !== favoriteRecipeToken.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(test2));
    setHeartColor(false);
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify(
      [...favoriteRecipes, favoriteRecipeToken],
    ));
    setHeartColor(true);
  }
};

export default functionSetFavoriteFood;
