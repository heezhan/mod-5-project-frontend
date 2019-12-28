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
        title: ""
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
        if (episodeObj.playlists === undefined || episodeObj.playlists.find( ({id}) => id === playlistObj.id ) === undefined) { 
            this.props.fetchEpisode(playlistObj, episodeObj,id)
        } else { 
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
        } else {
            episodeObj = this.props.searchResults.find( ({id}) => id === this.props.apiId )
            id = episodeObj.id
        }

        const {thumbnail, title_original, podcast_title_original, publisher_original, audio, description_original} = episodeObj 

        return (
            <div>
                <h2>{podcast_title_original}</h2>
                <h2>By {publisher_original}</h2>
                <h1>{title_original}</h1>
                <audio className="audio-size"
                        controls
                        src={audio}>
                            Your browser does not support the 
                            <code>{audio}</code> element.
                </audio>
                <h3>About This Episode</h3>
                <h3>{description_original}</h3>
                <div className="title">
                    {this.renderPopup(episodeObj, id)}
                </div>
            </div>
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
