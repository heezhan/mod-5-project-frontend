import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar';
import FiltersContainer from './containers/FiltersContainer';
import EpisodesContainer from './containers/EpisodesContainer';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        < NavBar />
        < SearchBar />
        < FiltersContainer />
        < EpisodesContainer />
      </div>
    )
  ;}
}

export default App;
