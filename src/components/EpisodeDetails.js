import React from 'react';
import { connect } from 'react-redux';
import { Button, Popup, Checkbox } from 'semantic-ui-react'

class EpisodeDetails extends React.Component {

    state = {
        selectedPlaylists: []
    }

    toggleCheckbox = (playlistObj) => {
        if (this.state.selectedPlaylists.includes(playlistObj)) {
            let updatedSelectedPlaylists = this.state.selectedPlaylists.filter(playlist => playlist.id !== playlistObj.id) 
            this.setState({
                selectedPlaylists: updatedSelectedPlaylists
            })
        } else {
            this.setState({
                selectedPlaylists: [...this.state.selectedPlaylists, playlistObj]
            })
        }
    }

    renderPopup = () => {
        return <Popup
        content={
            this.props.currentUser.playlists.map(playlistObj => <Checkbox
                label={<label>{playlistObj.title}</label>}
                value={playlistObj.id}
                onChange={() => this.toggleCheckbox(playlistObj)}
                checked={this.state.selectedPlaylists.includes(playlistObj)}
                />
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

        const {id, thumbnail, title_original, podcast_title_original, publisher_original, audio, description_original} = episodeObjInArray[0] 

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
                    {this.renderPopup()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(EpisodeDetails)
