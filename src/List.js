import React from 'react';
import Cocktail from './Cocktail';

const List = (props) => {
  return (
    <ul className="list">
      {
        props.cocktails.map(cocktail => {
          return <Cocktail key={cocktail.id} selectCocktail={props.selectCocktail} cocktail={cocktail} showDetails={false}/>
        })
      }
    </ul>
  )
}

export default List;
