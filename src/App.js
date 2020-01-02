import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
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
import PodcastsContainer from './containers/PodcastsContainer';
import PodcastDetails from './components/PodcastDetails';


class App extends React.Component {
  state = {
    query: "",
    activeFilter: "episodes"
  }

  onChangeSearch = (event) => {
    this.setState({
        query: event.target.value
    })
  }

  handleFilterClick = (event) => {
    this.setState({
      activeFilter: event.target.name
    }, () => {
      if (this.state.activeFilter === "episodes") {
      this.props.history.push(`/search/episodes/${this.state.query}`)
    } else {  
      this.props.history.push(`/search/podcasts/${this.state.query}`)
    }
    })
  }

  render() {
    return (
      <div className="App background-image">

        <Sticky>
          < NavBar />
        </Sticky>

        < Route exact path="/">
          <h1 className="logo">
            Podcastr
          </h1>
          < SearchBar 
            activeFilter={this.state.activeFilter}
            query={this.state.query}
            onChangeSearch={this.onChangeSearch}
          />
        </Route>

        < Route path="/search">
          < SearchBar 
            activeFilter={this.state.activeFilter}
            query={this.state.query}
            onChangeSearch={this.onChangeSearch}
          />
        </Route>

        < Route path="/search/episodes">
          < FiltersContainer 
              activeFilter={this.state.activeFilter} 
              handleFilterClick={this.handleFilterClick}
          />
        </Route>

        < Route path="/search/podcasts">
          < FiltersContainer 
              activeFilter={this.state.activeFilter} 
              handleFilterClick={this.handleFilterClick}
          />
        </Route>

        < Route exact path="/search/episodes/:query">
          < EpisodesContainer />
        </ Route >

        < Route exact path="/search/podcasts/:query">
          < PodcastsContainer />
        </ Route >

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
        
        {
          this.props.searchResults.length > 0 || this.props.allUserPlaylists.length > 0 ? 
          (
            <>
              < Route exact path="/episodes/:id" render={
                (props) => 
                { 
                  const apiId = props.match.params.id  
                  return <EpisodeDetails apiId={apiId} />
                }
              } />

              < Route exact path="/podcasts/:id" render={
              (props) => {
                const podcastId = props.match.params.id
                return < PodcastDetails podcastId={podcastId} />  
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

export default withRouter(connect(mapStateToProps)(App));
