import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Sticky } from 'semantic-ui-react'
import './App.css';
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar';
import FiltersContainer from './containers/FiltersContainer';
import EpisodesContainer from './containers/EpisodesContainer';
import EpisodeDetails from './components/EpisodeDetails';
import Login from './components/Login';
import PlaylistsContainer from './containers/PlaylistsContainer';
import PlaylistDetails from './components/PlaylistDetails';
import Signup from './components/Signup';
import SearchBar2 from './components/SearchBar2'

class App extends React.Component {

  render() {
    return (
      <div className="App">

        <Sticky>
          < NavBar />
        </Sticky>

        < Route exact path="/">
          < SearchBar />
        </Route>

        < Route exact path="/login" >
            < Login />
        </ Route >

        < Route exact path="/signup">
          < Signup />
        </Route>

        {this.props.currentUser ? (
          <>
            < Redirect to={"/playlists"} />
            
            < Route exact path="/playlists" >
              < PlaylistsContainer />
            </ Route >
          
            < Route exact path="/playlists/:id" 
              render={
                (props) => { 
                  const id = parseInt(props.match.params.id)
                  return < PlaylistDetails id={id} />
                }
              } 
            />
          </>
        ) : (
          null
        ) }
        
        {this.props.searchResults.length > 0 || this.props.allUserPlaylists.length > 0 ? 
        (
          <>
            <Route exact path="/search/:query">
              < SearchBar2 />
              < FiltersContainer />
              < EpisodesContainer />
            </Route>

            < Route exact path="/episodes/:id" render={
              (props) => 
              { 
                const apiId = props.match.params.id  
                return <EpisodeDetails apiId={apiId} />
              }
            } />
          </>
        ) : (
          null
        )
        }

      </div>
    )
  ;}
}

function mapStateToProps(state) {
  return { 
    currentUser: state.currentUser,
    searchResults: state.searchResults,
    allUserPlaylists: state.allUserPlaylists
  }
}

export default connect(mapStateToProps)(App);
