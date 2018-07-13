import React from 'react';
import Cocktail from './Cocktail';

const List = (props) => {
  return (
    <div className="list">
      <h1>Cocktail List</h1>
      <ul>
        {
          props.cocktails.map(cocktail => {
            return <Cocktail key={cocktail.id} selectCocktail={props.selectCocktail} cocktail={cocktail} showDetails={false}/>
          })
        }
      </ul>
    </div>
  )
}

export default List;
