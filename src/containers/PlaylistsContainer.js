import React from 'react';
import { connect } from 'react-redux';
import PlaylistCard from '../components/PlaylistCard';

class PlaylistsContainer extends React.Component {
    render() {
        const playlistArray = this.props.allUserPlaylists
         
        return (
            <div className="playlists-container">
                <div className="header">
                    <h1 className="google-font">My <br/> Playlists </h1>
                </div>
                <div className="playlists">
                    {
                        playlistArray.map(
                            playlistObj => 
                                < PlaylistCard playlist={playlistObj} />
                        )
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allUserPlaylists: state.allUserPlaylists
    }
}

export default connect(mapStateToProps)(PlaylistsContainer)