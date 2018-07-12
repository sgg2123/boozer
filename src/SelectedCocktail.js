import React from 'react';
import CocktailDetails from './CocktailDetails';

class SelectedCocktail extends React.Component {
  constructor() {
    super();

    this.state = {
      ingredients: [],
    };
  }

  fetchIngredients = (id) => {
    fetch(`http://localhost:3000/api/v1/cocktails/${id}`)
    .then(r => r.json())
    .then(data => {
      this.setState({
        ingredients: data.proportions
      });
    });
  }

  componentDidMount() {
    this.fetchIngredients(this.props.cocktail.id);
  }

  componentWillReceiveProps(nextprops) {
    this.fetchIngredients(nextprops.cocktail.id);
  }

  render() {
    return (
      <div className="selected-cocktail">
        <h2>{this.props.cocktail.name}</h2>
        <CocktailDetails cocktail={this.props.cocktail} ingredients={this.state.ingredients}/>
      </div>
    )
  }

}

export default SelectedCocktail;
