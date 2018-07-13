import React, { Component } from 'react';
import './App.css';
import List from './List';
import SelectedCocktail from './SelectedCocktail';
import Filter from './Filter';
import CreateForm from './CreateForm';
import cocktails from './cocktails.png';

class App extends Component {
  state = {
    cocktails: [],
    filteredCocktails: [],
    searchTerm: "",
    selectCocktail: null,
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

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/cocktails')
    .then(r => r.json())
    .then(data => {
      this.setState({
        cocktails: data,
        filteredCocktails: data,
      });
    });
  }

  selectCocktail = (id) => {
    const selectedCocktail = this.state.cocktails.find(cocktail => cocktail.id === id);
    this.setState({selectedCocktail});
  }

  handleSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    }, () => this.setState({filteredCocktails: this.filteredCocktails()}));
  }

  filteredCocktails = () => {
    return this.state.cocktails.filter(cocktail => {
      return cocktail.name.toLowerCase().includes(this.state.searchTerm.toLowerCase());
    });
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
      } else {
        alert('Cocktail Created!')
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
          }, () => {
            fetch('http://localhost:3000/api/v1/cocktails')
            .then(r => r.json())
            .then(data => {
              this.setState({
                cocktails: data,
                filteredCocktails: data,
              });
            });
          }
        ))
      })
    })
  };

  render() {
    return (
      <div className="App">
        <h1 className="App-header">Boozy</h1>
        <img src={cocktails} className="App-pic" alt="pic" />
        <Filter searchTerm={this.state.searchTerm} handleSearchChange={this.handleSearchChange}/>
        {
          this.state.selectedCocktail ?
          <SelectedCocktail cocktail={this.state.selectedCocktail} showDetails/>
          :
          null
        }
        {/*<List cocktails={this.filteredCocktails()} select={this.selectCocktail} />*/}
        <List cocktails={this.state.filteredCocktails} selectCocktail={this.selectCocktail} />
        <CreateForm
          handleFormSubmit={this.handleFormSubmit}
          handleChange={this.handleChange}
          handleAddIngredient={this.handleAddIngredient}
          name={this.state.name}
          description={this.state.description}
          instructions={this.state.instructions}
          proportions={this.state.proportions}
        />
      </div>
    );
  }

}

export default App;
