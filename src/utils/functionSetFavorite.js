const functionSetFavorite = (recipeRender, id, setHeartColor) => {
  const { strDrinkThumb, strDrink, strAlcoholic, strCategory } = recipeRender[0];

  const favoriteRecipeToken = {
    id,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
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

export default functionSetFavorite;
