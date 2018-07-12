import React from 'react';

class CreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      instructions: "",
      // proportions: {},
      ingredientName: "",
      quantity: "",
    };
  }

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    const name = this.state.name.toUpperCase()
    const description = this.state.description
    const instructions = this.state.instructions
    const ingredientName = this.state.ingredientName
    const quantity = this.state.quantity
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
        let id = parseInt(foundCocktail.id)

        let body = {proportions: [{id: 1, ingredient_name: ingredientName, amount: quantity}]};
        let config = {
          method: 'PATCH',
          headers: {"Content-type":"application/json"},
          body: JSON.stringify(body)
        };

        fetch(`http://localhost:3000/api/v1/cocktails/${id}`, config)
      })
    })



    console.log('Your cocktail is', name, ' ', 'Description:', description, ' ', 'Instructions:', instructions, ' ', 'Ingredients:', ingredientName, ' ', 'Quantity:', quantity)
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

          <label>
            Ingredient Name
            <input type="text" name="ingredientName" className="form-input" value={this.state.ingredientName} onChange={this.handleChange} />
          </label>

          <label>
            Quantity
            <input type="text" name="quantity" className="form-input" value={this.state.quantity} onChange={this.handleChange} />
          </label>

          <div>
            <p> </p>
            <button>Add Ingredient</button>
            <p> </p>
          </div>

          <input type="submit" value="Create Cocktail" className="form-input" />
        </form>

      </div>
    )
  }

}

export default CreateForm;
