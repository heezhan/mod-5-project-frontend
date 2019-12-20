import React from 'react';
import { connect } from 'react-redux';
import PlaylistCard from '../components/PlaylistCard';

class PlaylistsContainer extends React.Component {
    render() {
        const playlistArray = this.props.allUserPlaylists
         
        return (
            <div>
                <h1>My Playlists</h1>
                {
                    playlistArray.map(
                        playlistObj => 
                            < PlaylistCard playlist={playlistObj} />
                    )
                }
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