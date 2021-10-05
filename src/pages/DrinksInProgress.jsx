import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import ShareBtn from '../components/ShareBtn';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { drinkById } from '../utils/fetchAPIbyID';
import useRedirect from '../hooks/useRedirect';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

function DrinksInProgress() {
  const { id } = useParams();
  const [drinkDetails, setDrinkDetails] = useState({});
  const [progress, setProgress] = useState([]);
  const { shouldRedirect, redirect } = useRedirect();
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const fetchDrink = async () => {
      const drink = await drinkById(id);
      setDrinkDetails(drink);
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes && progress
        .length === 0 && Object.keys(inProgressRecipes.cocktails)
        .some((key) => key === id)) {
        const { cocktails } = inProgressRecipes;
        const loadedProgress = cocktails[id];
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
    fetchDrink();
  }, [id, progress]);

  const retObj = Object.entries(drinkDetails);
  const listIngredients = retObj.filter((drink) => (
    drink[0].includes('Ingredient') && drink[1]
  ));
  const filterAlcoohol = retObj.filter((drink) => {
    const noAlcool = drink[1] !== ' ' && drink[1] !== null;
    return drink[0].includes('Measure') && noAlcool;
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
        cocktails: { [id]: updatedProgress },
      };
    } else {
      let { cocktails } = inProgressRecipes;
      if (inProgressRecipes.cocktails) {
        cocktails[id] = updatedProgress;
      } else {
        const recipeProgress = { [id]: [...updatedProgress] };
        cocktails = { ...cocktails, ...recipeProgress };
      }
      inProgressRecipes.cocktails = cocktails;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const finishRecipe = () => {
    const { strCategory, strDrinkThumb, strDrink, strTags } = drinkDetails;
    const d = new Date();
    const dataDMY = `${d.getDay()}/${d.getMonth()}/${d.getFullYear()}`;
    const dataTIME = `${d.getHours()}hrs${d.getMinutes()}min`;
    let arrTag;
    if (strTags) {
      arrTag = strTags.split(',');
    } else {
      arrTag = null;
    }
    const finishedRecipeToken = {
      id,
      type: 'bebida',
      area: null,
      category: strCategory,
      alcoholicOrNot: null,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: `${dataDMY} às ${dataTIME}`,
      tags: arrTag,
    };
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if ((Object.keys(inProgressRecipes)
      .length && Object.keys(inProgressRecipes.cocktails).length) === 1) {
      localStorage.removeItem('inProgressRecipes');
    } else {
      delete inProgressRecipes.cocktails[id];
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

  const isDisabled = () => {
    const el = document.querySelectorAll('input');
    if (!(Array.from(el).every((x) => x.checked))) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };
  const setFavorite = () => {
    const { strDrinkThumb, strDrink, strAlcoholic, strCategory } = drinkDetails;
    const favoriteRecipeToken = {
      id,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      if (favoriteRecipes.every((recipe) => recipe.id !== favoriteRecipeToken.id)) {
        favoriteRecipes.push(favoriteRecipeToken);
        document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
      } else {
        favoriteRecipes = favoriteRecipes
          .filter((recipe) => recipe.id !== favoriteRecipeToken.id);
        document.getElementById('fav-btn').setAttribute('src', whiteHeartIcon);
      }
    } else {
      favoriteRecipes = [favoriteRecipeToken];
      document.getElementById('fav-btn').setAttribute('src', blackHeartIcon);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    if (Object.values(favoriteRecipes).length === 0) {
      localStorage.removeItem('favoriteRecipes');
    }
  };
  return (
    <div onChange={ isDisabled } className="in-progress">
      { redirect.should && <Redirect to={ redirect.path } />}
      <HeaderWithoutSearch>Receita em progresso</HeaderWithoutSearch>
      <img
        src={ drinkDetails.strDrinkThumb }
        alt="imagem da bebida"
        data-testid="recipe-photo"
        className="in-progress-pic"
      />
      <div className="detail-card">
        <h2 data-testid="recipe-title">{ drinkDetails.strDrink }</h2>
        <div className="details-btn-div">
          <ShareBtn id={ id } type="bebida" />
          <Button
            className="favorite-btn"
            variant="danger"
            type="button"
            onClick={ setFavorite }
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
        { drinkDetails.strAlcoholic }
      </p>
      <div className="list-ingredients">
        <h4>Ingredientes</h4>
        <ul>
          {listIngredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-step` }
              className="in-progress-list"
            >
              <Form.Group className="mb-3" controlId={ `${index}-ingredient-step` }>
                <Form.Check
                  type="checkbox"
                  id={ `${index}-ingredient-step` }
                  label={ filterAlcoohol[index] ? (
                    `${ingredient[1]} - ${filterAlcoohol[index][1]}`
                  ) : (ingredient[1]) }
                  onChange={ ({ target }) => {
                    const label = target.parentElement;
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
      <strong>Instruções: </strong>
      <p
        className="instructions"
        data-testid="instructions"
      >
        { drinkDetails.strInstructions }
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
export default DrinksInProgress;
