import React from 'react';

const Cocktail = (props) => {
  return (
    <div className="cocktail" onClick ={() => props.selectCocktail(props.cocktail.id)}>
      <p>{props.cocktail.name.trim().toLowerCase().split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')}</p>
    </div>
  )
}

export default Cocktail;
