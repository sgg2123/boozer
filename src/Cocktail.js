import React from 'react';
import CocktailDetails from './CocktailDetails';

const Cocktail = (props) => {
  return (
    <div className="cocktail" onClick ={() => props.selectCocktail(props.cocktail.id)}>
      <p>{props.cocktail.name}</p>
    </div>
  )
}

export default Cocktail;
