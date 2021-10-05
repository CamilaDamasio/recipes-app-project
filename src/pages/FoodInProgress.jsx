import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import ShareBtn from '../components/ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { foodById } from '../utils/fetchAPIbyID';
import useRedirect from '../hooks/useRedirect';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function FoodInProgress() {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState({});
  const { shouldRedirect, redirect } = useRedirect();
  const [progress, setProgress] = useState([]);
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const fetchMeals = async () => {
      const food = await foodById(id);
      setFoodDetails(food);
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes && progress
        .length === 0 && Object.keys(inProgressRecipes.meals)
        .some((key) => key === id)) {
        const { meals } = inProgressRecipes;
        const loadedProgress = meals[id];
        setProgress(loadedProgress);
        const inputs = document.querySelectorAll('input');
        if (inputs) {
          inputs.forEach((input) => {
            if (loadedProgress.some((value) => value === input.parentElement
              .querySelector('label').innerText)) {
              input.defaultChecked = true;
              input.parentElement
                .querySelector('label').style.textDecoration = 'line-through';
            }
          });
        }
      }
    };
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const isFavorite = () => favoriteRecipes
        .some((recipe) => recipe.id === id) && document.getElementById('fav-btn')
        .setAttribute('src', blackHeartIcon);
      isFavorite();
    }
    fetchMeals();
  }, [id, progress]);

  const retObj = Object.entries(foodDetails);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  const filterAlcoohol = retObj.filter((meal) => {
    const noAlcool = meal[1] !== ' ' && meal[1] !== null;
    return meal[0].includes('Measure') && noAlcool;
  });

  const progressRecipe = (labelValue) => {
    let updatedProgress = [];
    if (!progress.some((value) => value === labelValue)) {
      updatedProgress = progress.concat(labelValue);
      setProgress(updatedProgress);
    } else {
      updatedProgress = progress.filter((ingredient) => ingredient !== labelValue);
      setProgress(updatedProgress);
    }
    let inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      inProgressRecipes = {
        meals: { [id]: updatedProgress },
      };
    } else {
      let { meals } = inProgressRecipes;
      if (inProgressRecipes.meals) {
        meals[id] = updatedProgress;
      } else {
        const recipeProgress = { [id]: [...updatedProgress] };
        meals = { ...meals, ...recipeProgress };
      }
      inProgressRecipes.meals = meals;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const isDisabled = () => {
    const el = document.querySelectorAll('input');
    if (!(Array.from(el).every((x) => x.checked))) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const finishRecipe = () => {
    const { strArea, strCategory, strMealThumb, strMeal, strTags } = foodDetails;
    const d = new Date();
    const dataDMY = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
    const dataTIME = `${d.getHours()}hrs${d.getMinutes()}min`;
    let arrTag;
    if (strTags) {
      arrTag = strTags.split(',');
    } else {
      arrTag = '';
    }
    const finishedRecipeToken = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: `${dataDMY} às ${dataTIME}`,
      tags: arrTag,
    };
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ((Object.keys(inProgressRecipes)
      .length && Object.keys(inProgressRecipes.meals).length) === 1) {
      localStorage.removeItem('inProgressRecipes');
    } else {
      delete inProgressRecipes.meals[id];
    }
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      doneRecipes.push(finishedRecipeToken);
    } else {
      doneRecipes = [finishedRecipeToken];
    }
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    shouldRedirect('/receitas-feitas');
  };
  const setFavorite = () => {
    const { strArea, strCategory, strMealThumb, strMeal } = foodDetails;
    const favoriteRecipeToken = {
      id,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      if (favoriteRecipes.some((recipe) => recipe.id !== favoriteRecipeToken.id)) {
        favoriteRecipes.push(favoriteRecipeToken);
        document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
      } else {
        favoriteRecipes = favoriteRecipes
          .filter((recipe) => recipe.id !== favoriteRecipeToken.id);
        document.getElementById('fav-btn').setAttribute('src', whiteHeartIcon);
      }
    } else {
      favoriteRecipes = [favoriteRecipeToken];
      document.getElementById('fav-btn').src = blackHeartIcon;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    if (Object.values(favoriteRecipes).length === 0) {
      localStorage.removeItem('favoriteRecipes');
    }
  };
  return (
    <div onChange={ isDisabled } className="in-progress">
      { redirect.should && <Redirect to={ redirect.path } />}
      <HeaderWithoutSearch>Receita em Progresso</HeaderWithoutSearch>
      <img
        src={ foodDetails.strMealThumb }
        alt="imagem da comida"
        data-testid="recipe-photo"
        className="in-progress-pic"
      />
      <div className="detail-card">
        <h3 data-testid="recipe-title">{ foodDetails.strMeal }</h3>
        <div className="details-btn-div">

          <ShareBtn id={ id } type="comida" />
          <Button
            variant="danger"
            type="button"
            onClick={ setFavorite }
            className="favorite-btn"
          >
            <img
              id="fav-btn"
              className="icon"
              src={ whiteHeartIcon }
              alt="favoritar"
              data-testid="favorite-btn"
            />
          </Button>
        </div>
      </div>
      <p data-testid="recipe-category">
        <span>Categoria: </span>
        { foodDetails.strCategory }
      </p>
      <div className="list-ingredients">
        <h4>Ingredientes</h4>
        <ul>
          {listIngredients.map((ingredient, index) => (
            <li
              className="in-progress-list"
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <Form.Group className="mb-3" controlId={ `${index}-ingredient-step` }>
                <Form.Check
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  label={ filterAlcoohol[index] ? (
                    `${ingredient[1]} - ${filterAlcoohol[index][1]}`
                  ) : (ingredient[1]) }
                  onChange={ ({ target }) => {
                    const label = target.parentElement.querySelector('label');
                    progressRecipe(label.innerText);
                    if (target.checked) {
                      label.style.textDecoration = 'line-through';
                    } else if (!target.checked) {
                      target.defaultChecked = false;
                      label.style.textDecoration = 'none';
                    }
                  } }
                />
              </Form.Group>
            </li>
          ))}
        </ul>
      </div>
      <strong>Instruções</strong>
      <p
        className="instructions"
        data-testid="instructions"
      >
        { foodDetails.strInstructions }
      </p>
      <Button
        disabled={ disabled }
        type="button"
        data-testid="finish-recipe-btn"
        className="finishRecipe"
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </Button>
    </div>
  );
}
export default FoodInProgress;
