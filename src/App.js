import React, { Component } from 'react';
import './App.css';
import List from './List';
import SelectedCocktail from './SelectedCocktail';
import Filter from './Filter';
import CreateForm from './CreateForm';

class App extends Component {
  state = {
    cocktails: [],
    filteredCocktails: [],
    searchTerm: "",
    selectCocktail: null,
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

  render() {
    return (
      <div className="App">
        <Filter searchTerm={this.state.searchTerm} handleSearchChange={this.handleSearchChange}/>
        {
          this.state.selectedCocktail ?
          <SelectedCocktail cocktail={this.state.selectedCocktail} showDetails/>
          :
          null
        }
        {/*<List cocktails={this.filteredCocktails()} select={this.selectCocktail} />*/}
        <List cocktails={this.state.filteredCocktails} selectCocktail={this.selectCocktail} />
        <CreateForm />
      </div>
    );
  }

}

export default App;
