import React from 'react';

class CreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      instructions: "",
      proportions: [
        {
          id: 0,
          ingredient_name: "",
          amount: "",
        }
      ],
    };
  }

  handleChange = (event) => {
    if (event.target.name === 'amount' || event.target.name === 'ingredient_name') {
      let proportionsCopy = [...this.state.proportions]
      let newProportions = proportionsCopy.map(prop => {
        if (prop.id === parseInt(event.target.id, 10)) {
          prop[event.target.name] = event.target.value
        }
        return prop
      })
      this.setState({
        proportions: newProportions
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  handleAddIngredient = () => {
    this.setState({
      proportions: this.state.proportions.concat([{id: this.state.proportions.length, ingredient_name: '', amount: ''}])
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const name = this.state.name.toUpperCase()
    const description = this.state.description
    const instructions = this.state.instructions
    const proportions = this.state.proportions
    const source = 'User Input'

    let body = {name: name, description: description, instructions: instructions, source: source};
    let config = {
      method: 'POST',
      headers: {"Content-type":"application/json"},
      body: JSON.stringify(body)
    };

    fetch('http://localhost:3000/api/v1/cocktails', config)
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        alert(data.error);
        return;
      }
      fetch('http://localhost:3000/api/v1/cocktails')
      .then(r => r.json())
      .then(data => {

        let foundCocktail = data.find(cocktail => cocktail.name === name)
        let id = parseInt(foundCocktail.id, 10)

        let newArr = []
        proportions.forEach(prop => {
          newArr.push({ingredient_name: prop.ingredient_name, amount: prop.amount})
        })

        let body = {proportions: newArr};
        let config = {
          method: 'PATCH',
          headers: {"Content-type":"application/json"},
          body: JSON.stringify(body)
        };

        fetch(`http://localhost:3000/api/v1/cocktails/${id}`, config)
        .then(this.setState(
          {
            name: "",
            description: "",
            instructions: "",
            proportions: [
              {
                id: 0,
                ingredient_name: "",
                amount: "",
              }
            ],
          }
        ))
      })
    })
    alert('Cocktail Created!')
  };

  render() {
    return (
      <div className="form">

        <h1>Create a Cocktail</h1>

        <form onSubmit={this.handleFormSubmit}>
          <label>
            Name
            <input type="text" name="name" className="form-input" value={this.state.name} onChange={this.handleChange} />
          </label>

          <label>
            Description
            <input type="text" name="description" className="form-input" value={this.state.description} onChange={this.handleChange} />
          </label>

          <label>
            Instructions
            <input type="text" name="instructions" className="form-input" value={this.state.instructions} onChange={this.handleChange} />
          </label>

          <h4>Proportions</h4>
          {this.state.proportions.map(proportion => {
            return (
              <div key={proportion.id}>
                <label>
                  Ingredient Name
                  <input id={proportion.id} key={`ingredient-${proportion.id}`} type="text" name="ingredient_name" className="form-input" value={this.state.proportions[proportion.id].ingredient_name} onChange={this.handleChange} />
                </label>

                <label>
                  Amount
                  <input id={proportion.id} key={`amount-${proportion.id}`} type="text" name="amount" className="form-input" value={this.state.proportions[proportion.id].amount} onChange={this.handleChange} />
                </label>
                <p> </p>
              </div>
            )
          })}

          <div>
            <p> </p>
            <p> </p>
            <button type="button" onClick={this.handleAddIngredient}>Add Ingredient</button>
            <p> </p>
          </div>

          <input type="submit" value="Create Cocktail" className="form-input" />
        </form>

      </div>
    )
  }

}

export default CreateForm;
