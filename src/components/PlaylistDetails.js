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
            <div>
                <h1>
                    {foundPlaylist.title}
                </h1>
                    < Modal 
                    trigger={
                        < Button >
                            < Button.Content onClick={null}>
                                < Icon name="pencil alternate" />
                            </ Button.Content >
                        </ Button >
                    } 
                    basic size="small"
                    closeIcon
                    >
                        < Header 
                            icon='pencil alternate' 
                        />

                        < Modal.Content >
                            <h2>
                                Give it a new name
                            </h2>
                            <Input 
                                type="text"
                                name="title" 
                                value={this.state.title} 
                                onChange={this.onChangeTitle}
                            />
                        </ Modal.Content >

                        < Modal.Actions >
                            < Button 
                                basic color='white'
                                inverted 
                            >
                                < Icon name='remove' /> 
                                Cancel
                            </ Button >

                            <Link to="/playlists">
                                < Button 
                                    color='green'
                                    inverted
                                    onClick={() => this.handleEdit(playlistId, this.state.title)}
                                >
                                    < Icon name='checkmark' /> 
                                    Edit
                                </ Button >
                            </Link>
                        </ Modal.Actions >
                    </ Modal >
                {
                    foundPlaylist.episodes.map(
                        episode => 
                            <Link to={`/episodes/${episode.api_id}`}>
                                <h2>{episode.title_original}</h2>
                            </Link>
                    )
                }
                <br/>
                
                < Modal 
                    trigger={
                        < Button animated="vertical" >
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
                        icon='trash alternate' 
                    />

                    < Modal.Content >
                        <h2>
                            Are you sure you want to delete this playlist?
                        </h2>
                    </ Modal.Content >

                    < Modal.Actions >
                        < Button 
                            basic color='white'
                            inverted 
                        >
                            < Icon name='remove' /> 
                            Cancel
                        </ Button >

                        <Link to="/playlists">
                            < Button 
                                color='green'
                                inverted
                                onClick={() => this.handleDelete(foundPlaylist)}
                            >
                                < Icon name='checkmark' /> 
                                Delete
                            </ Button >
                        </Link>
                    </ Modal.Actions >
                </ Modal >
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