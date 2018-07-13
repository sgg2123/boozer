import React from 'react';

class CreateForm extends React.Component {
  render() {
    return (
      <div className="form">

        <h1>Create a Cocktail</h1>

        <form onSubmit={this.props.handleFormSubmit}>
          <label>
            Name
            <input type="text" name="name" className="form-input" value={this.props.name} onChange={this.props.handleChange} />
          </label>

          <label>
            Description
            <input type="text" name="description" className="form-input" value={this.props.description} onChange={this.props.handleChange} />
          </label>

          <label>
            Instructions
            <input type="text" name="instructions" className="form-input" value={this.props.instructions} onChange={this.props.handleChange} />
          </label>

          <p><strong>Proportions:</strong></p>
          {this.props.proportions.map(proportion => {
            return (
              <div key={proportion.id}>
                <label>
                  Ingredient Name
                  <input id={proportion.id} key={`ingredient-${proportion.id}`} type="text" name="ingredient_name" className="form-input" value={this.props.proportions[proportion.id].ingredient_name} onChange={this.props.handleChange} />
                </label>

                <label>
                  Amount
                  <input id={proportion.id} key={`amount-${proportion.id}`} type="text" name="amount" className="form-input" value={this.props.proportions[proportion.id].amount} onChange={this.props.handleChange} />
                </label>
                <p> </p>
              </div>
            )
          })}

          <div>
            <p> </p>
            <p> </p>
            <button type="button" onClick={this.props.handleAddIngredient}>Add Ingredient</button>
            <p> </p>
          </div>

          <input type="submit" value="Create Cocktail" className="form-input" />
        </form>

      </div>
    )
  }

}

export default CreateForm;
