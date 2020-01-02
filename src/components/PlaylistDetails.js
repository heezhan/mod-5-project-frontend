import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Modal, Input } from 'semantic-ui-react'; 
import { destroyPlaylist } from '../redux/actions/destroyPlaylist';
import { updatePlaylist } from '../redux/actions/editPlaylist';

class PlaylistDetails extends React.Component {
    state = {
        title: this.props.allUserPlaylists.find( ({id}) => id === this.props.id ).title 
    }

    onChangeTitle = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEdit = (playlistId, title) => { 
        this.props.updatePlaylist(playlistId, title) 
    }

    handleDelete = (foundPlaylist) => {
        const playlistId = foundPlaylist.id
        this.props.destroyPlaylist(playlistId)
    }

    render() {
        const playlistId = this.props.id

        const foundPlaylist = this.props.allUserPlaylists.find( ({id}) => id === playlistId )

        return (
            <div className="playlist-details-container">
                <h1 className="playlist-title playlist">
                    {foundPlaylist.title} &nbsp;
                    < Modal 
                        trigger={
                            < Button 
                                circular icon="pencil alternate"
                                basic inverted color="yellow"
                                size="big"
                            />
                        } 
                        basic size="small"
                        closeIcon
                    >
                        < Header 
                            icon="pencil alternate"
                        />

                        < Modal.Content >
                            <center>
                                <h2>
                                    Give it a new name
                                </h2>
                           
                                <Input 
                                    size="big"
                                    type="text"
                                    name="title" 
                                    value={this.state.title} 
                                    onChange={this.onChangeTitle}
                                />
                            </center>
                        </ Modal.Content >

                      
                        < Modal.Actions >
                            <center>
                                < Button 
                                    basic inverted
                                    icon="remove"
                                    content="Cancel"
                                />
                            
                                {/* have it link to its show page  */}
                                <Link to="/playlists">
                                    < Button 
                                        color="green"
                                        inverted
                                        icon="checkmark"
                                        content="Edit"
                                        onClick={() => this.handleEdit(playlistId, this.state.title)}
                                    />
                                </Link>
                            </center>
                        </ Modal.Actions >
                    </ Modal >
                    <br/>         
                    < Modal 
                        trigger={
                            < Button basic color="white" inverted animated="vertical" size="big">
                                < Button.Content hidden >
                                    Delete
                                </ Button.Content >
                                < Button.Content visible >
                                    < Icon name="trash alternate" />
                                </ Button.Content >
                            </ Button >
                        } 
                        basic size="small"
                        closeIcon
                    >
                        < Header 
                            icon="trash alternate"
                        />

                        < Modal.Content >
                            <center>
                                <h2>
                                    Are you sure you want to delete this playlist?
                                </h2>
                            </center>
                        </ Modal.Content >
                        
                        < Modal.Actions >
                            <center>
                                < Button 
                                    basic color="white"
                                    inverted 
                                >
                                    < Icon name="remove" /> 
                                    Cancel
                                </ Button >
        
                                <Link to="/playlists">
                                    < Button 
                                        color="green"
                                        inverted
                                        onClick={() => this.handleDelete(foundPlaylist)}
                                    >
                                        < Icon name="checkmark" /> 
                                        Delete
                                    </ Button >
                                </Link>
                            </center>
                        </ Modal.Actions >
                    </ Modal >
                </h1>

                <div className="episodes">
                    { 
                        foundPlaylist.episodes.map(
                            episode => 
                            <Header as='h2'>
                                <Icon name='podcast'/>
                                <Header.Content className="episode-header">
                                    <Link className="diff-link" to={`/episodes/${episode.api_id}`}>
                                        <b>{episode.title_original}</b>
                                    </Link>
                                        <Header.Subheader className="text-color">
                                            <b>{episode.publisher_original} ✿ {episode.podcast_title_original}</b>
                                        </Header.Subheader>
                                </Header.Content>
                            </Header>
                        )
                    }
                </div>
                <br/>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allUserEpisodes: state.allUserEpisodes,
        allUserPlaylists: state.allUserPlaylists
    }
}

function mapDispatchToProps(dispatch) {
    return {
        destroyPlaylist: (playlistId) => dispatch(destroyPlaylist(playlistId)),
        updatePlaylist: (playlistId, title) => dispatch(updatePlaylist(playlistId, title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistDetails)