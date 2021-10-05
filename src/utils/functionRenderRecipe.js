const functionRenderRecipe = (recipeRender) => {
  if (recipeRender !== undefined) {
    const ingredients = recipeRender.map((value) => Object.entries(value)
      .filter((ingredient) => ingredient[0]
        .includes('strIngredient') && ingredient[1] && ingredient[1].length
    && ingredient[1] !== null).map((item) => item[1]));

    const measures = recipeRender.map((value) => Object.entries(value)
      .filter((ingredient) => ingredient[0]
        .includes('strMeasure') && ingredient[1] && ingredient[1] !== ' '
    && ingredient[1] !== null).map((item) => item[1]));

    const ingredientsAndMeasures = ingredients
      .map((name, index) => ({ nome: name, quantidade: measures[index] }));

    const ingredientsAndMeasuresList = (ingredientsAndMeasures && ingredientsAndMeasures
      .length && Object.values(ingredientsAndMeasures[0]));

    return ingredientsAndMeasuresList;
  }
};

export default functionRenderRecipe;
