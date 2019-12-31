import React from 'react';
import { connect } from 'react-redux';
import { Button, Popup, Checkbox, Divider } from 'semantic-ui-react';
import { fetchEpisode } from '../redux/actions/fetchEpisode';
import { fetchPlaylist } from '../redux/actions/fetchPlaylist';
import { destroyPlaylistEpisode } from '../redux/actions/destroyPlaylistEpisode';
import { removeEpisode } from '../redux/actions/destroyPlaylistEpisode'

class EpisodeDetails extends React.Component {
    state = {
        selectedPlaylists: [],
        title: "",
        stateEpisode: null,
        episodeObj: undefined,
        id: undefined 
    }

    clickHandler = () => {
        // clear form input
        this.props.fetchPlaylist({user_id: this.props.currentUser.id, title: this.state.title})
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        }) 
    }

    toggleCheckbox = (playlistObj, episodeObj, id) => {  
        console.log(playlistObj, episodeObj, id)
        if (episodeObj.playlists === undefined || episodeObj.playlists.find(({id}) => id === playlistObj.id ) === undefined) { 
            this.props.fetchEpisode(playlistObj, episodeObj,id)
        } else { 
            debugger 
            this.props.destroyPlaylistEpisode(playlistObj, episodeObj, id)
        }
    }

    renderPopup = (episodeObj, id) => { 
        return <Popup 
        content={ 
            this.props.currentUser ? 
            (   this.props.allUserPlaylists.length > 0 ?  
                (
                    <div>
                        {this.props.allUserPlaylists.map(playlistObj => 
                            <Checkbox
                                label={<label>{playlistObj.title}</label>}
                                value={playlistObj.id}
                                onChange={
                                    () => this.toggleCheckbox(playlistObj, episodeObj, id)
                                }
                                checked={playlistObj.episodes.find( ({id}) => id === episodeObj.id) ? (true) : (false)}
                            />
                        )}
                        < Divider />
                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={this.state.title} 
                            onChange={this.onChangeTitle}
                        />
                        <button 
                            onClick={this.clickHandler} 
                        >
                            Create a playlist
                        </button>
                    </div>
                ) : (
                    <div>
                        No playlists yet
                        < Divider />
                        <input 
                            type="text" 
                            placeholder="Title" 
                            value={this.state.title} 
                            onChange={this.onChangeTitle}
                        />
                        <button 
                            onClick={this.clickHandler} 
                        >
                            Create a playlist
                        </button>
                    </div>
                )
            ) : (
                // create an alert
                "Not logged in"
            )
        }
        on="click"
        pinned 
        position="bottom center"
        trigger={
            <Button icon="add" content="Add to Playlist"/>
        }
        />
    }

    componentDidMount() {
        // let episodeObj
        let userEpisode = this.props.allUserEpisodes.find( ({api_id}) => api_id === this.props.apiId )
        // let id 

        if (userEpisode) {
            if (this.props.allUserEpisodes.filter(episode => episode.api_id === userEpisode.api_id).length > 1) {
               
                this.setState({ episodeObj: this.props.allUserEpisodes.find( episode => episode.playlists === undefined )}, () => {
                    this.setState({id: this.state.episodeObj.api_id})
                } )
                // this.props.removeEpisode(this.state.episodeObj) 
            } else {
              
                this.setState({episodeObj: userEpisode}, () => {
                    this.setState({id: this.state.episodeObj.api_id})
                })
            }
        } else if (this.props.searchResults.find( ({id}) => id === this.props.apiId )) {
                
            this.setState({episodeObj: this.props.searchResults.find( ({id}) => id === this.props.apiId )}, () => {
                this.setState({id: this.state.episodeObj.id})})
        } else {
            fetch("http://localhost:3000/episodedetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: this.props.apiId 
                })
            })
            .then(resp => resp.json())
            .then(episode => this.setState({
                stateEpisode: episode
            }), () => {
                this.setState({episodeObj: this.state.stateEpisode})
                this.setState({id: this.props.apiId})
            })
        }
    }
    
    render() {
        let episodeObj
        let userEpisode = this.props.allUserEpisodes.find( ({api_id}) => api_id === this.props.apiId )
        let id 

        if (userEpisode) {
            if (this.props.allUserEpisodes.filter(episode => episode.api_id === userEpisode.api_id).length > 1) {
                episodeObj = this.props.allUserEpisodes.find( episode => episode.playlists === undefined )
                this.props.removeEpisode(episodeObj) 
            } else {
                episodeObj = userEpisode 
            }
            id = episodeObj.api_id
        } else if (this.props.searchResults.find( ({id}) => id === this.props.apiId )) {
            episodeObj = this.props.searchResults.find( ({id}) => id === this.props.apiId )
            id = episodeObj.id
        } 

        return (
            this.state.episodeObj !== undefined ? 
            ( 
            <div>
                <h2>{episodeObj.podcast_title_original}</h2>
                <h2>By {episodeObj.publisher_original}</h2>
                <h1>{episodeObj.title_original}</h1>
                <audio className="audio-size"
                        controls
                        src={episodeObj.audio}>
                            Your browser does not support the 
                            <code>{episodeObj.audio}</code> element.
                </audio>
                <h3>About This Episode</h3>
                <h3>{episodeObj.description_original}</h3>
                <div className="title">
                    {this.renderPopup(episodeObj, id)}
                </div>
            </div>
            ) : (
                this.state.stateEpisode ? (<h1>{this.state.stateEpisode.title}</h1>) : (null)
            ) 
        ) 
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        currentUser: state.currentUser,
        allUserPlaylists: state.allUserPlaylists,
        allUserEpisodes: state.allUserEpisodes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEpisode: (playlistObj, episodeObj, id) => dispatch(fetchEpisode(playlistObj, episodeObj, id)),
        fetchPlaylist: (playlistObj) => dispatch(fetchPlaylist(playlistObj)),
        destroyPlaylistEpisode: (playlistObj, episodeObj, id) => dispatch(destroyPlaylistEpisode(playlistObj, episodeObj, id)),
        removeEpisode: (episode) => dispatch(removeEpisode(episode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetails)
