import React from 'react';
import UUID from 'uuid';

class CocktailDetails extends React.Component {
  renderIngredients = () => {
    return this.props.ingredients.map(ingredient => {
      return (
        <li key={UUID()}><strong>{ingredient.amount}</strong> {ingredient.ingredient_name}</li>
        );
    });
  }

  render() {
    return (
      <div className="cocktail-details">
        <p><strong>Description: </strong>{this.props.cocktail.description}</p>
        <p><strong>Instructions: </strong>{this.props.cocktail.instructions}</p>
        <h3>Ingredients: </h3>
        <ul>
          {this.renderIngredients()}
        </ul>
      </div>
    )
  }

}

export default CocktailDetails;
