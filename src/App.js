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
import PlaylistDetails from './components/PlaylistDetails';

class App extends React.Component {

  render() {
    return (
      <div className="App">

        < NavBar />

        <Route exact path="/">
          < SearchBar />
          < FiltersContainer />
          < EpisodesContainer />
        </Route>
   
        <Route exact path="/login">
          < Login />
        </Route>

        {this.props.currentUser ? < Redirect to={"/playlists"} /> : null }

        <Route exact path="/playlists">
          <PlaylistsContainer />
        </Route>
        
        <Route exact path="/playlists/:id" 
          render={
            (props) => { 
              const id = parseInt(props.match.params.id)
              return < PlaylistDetails id={id}/>
            }
          } 
        />

        <Route exact path="/episodes/:id" render={
          (props) => 
          { 
            const apiId = props.match.params.id  
            return <EpisodeDetails apiId={apiId} />
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
