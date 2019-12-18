import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar';
import FiltersContainer from './containers/FiltersContainer';
import EpisodesContainer from './containers/EpisodesContainer';
import EpisodeDetails from './components/EpisodeDetails';
import Login from './components/Login';
import PlaylistsContainer from './containers/PlaylistsContainer';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        
        <Route exact path="/">
          < NavBar />
          < SearchBar />
          < FiltersContainer />
          < EpisodesContainer />
        </Route>
   
        <Route exact path="/login">
          < Login />
        </Route>

        {this.props.currentUser ? < Redirect to={"/"} /> : null }

        <Route exact path="/playlists">
          <PlaylistsContainer />
        </Route>

        <Route exact path="/episodes/:id" render={
          (props) => 
          { 
            let api_id = props.match.params.id
            return <EpisodeDetails api_id={api_id} />
          }
        }/>

      </div>
    )
  ;}
}

function mapStateToProps(state) {
  return { currentUser: state.currentUser }
}

export default connect(mapStateToProps)(App);
