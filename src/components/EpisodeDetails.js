import React from 'react';
import { connect } from 'react-redux';
import { Button, Popup, Checkbox, Divider } from 'semantic-ui-react';
import { fetchEpisode } from '../redux/actions/fetchEpisode';
import { fetchPlaylist } from '../redux/actions/fetchPlaylist';

class EpisodeDetails extends React.Component {

    state = {
        selectedPlaylists: [],
        title: ""
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        }) 
    }

    toggleCheckbox = (playlistObj, episodeObj) => {
        console.log(episodeObj)  

        if (this.state.selectedPlaylists.includes(playlistObj)) {
            let updatedSelectedPlaylists = this.state.selectedPlaylists.filter(playlist => playlist.id !== playlistObj.id) 

            this.setState({
                selectedPlaylists: updatedSelectedPlaylists
            })
        } else { 
            this.setState({
                selectedPlaylists: [...this.state.selectedPlaylists, playlistObj]
            })
            this.props.fetchEpisode(episodeObj)
        }
    }

    renderPopup = (episodeObj) => { 
        return <Popup 
        content={ 
            this.props.currentUser ? 
            (   this.props.currentUser.playlists.length > 0 ?  
                (
                    <div>
                        {this.props.allUserPlaylists.map(playlistObj => 
                            <Checkbox
                                label={<label>{playlistObj.title}</label>}
                                value={playlistObj.id}
                                onChange={
                                    () => this.toggleCheckbox(playlistObj, episodeObj)
                                }
                                checked={this.state.selectedPlaylists.includes(playlistObj)} 
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
                            onClick={() => this.props.fetchPlaylist({user_id: this.props.currentUser.id, title: this.state.title})} 
                        >
                            Create a playlist
                        </button>
                    </div>
                ) : (
                    <div>
                        No playlists yet
                        < Divider />
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
        const episodeObjInArray = this.props.searchResults.filter(episodeObj => episodeObj.id === this.props.api_id)

        const episodeObj = episodeObjInArray[0]

        const {id, thumbnail, title_original, podcast_title_original, publisher_original, audio, description_original} = episodeObj 

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
                    {this.renderPopup(episodeObj)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        currentUser: state.currentUser,
        allUserPlaylists: state.allUserPlaylists
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEpisode: (episodeObj) => dispatch(fetchEpisode(episodeObj)),
        fetchPlaylist: (playlistObj) => dispatch(fetchPlaylist(playlistObj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetails)
