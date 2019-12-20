import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PlaylistsContainer extends React.Component {
    render() {
        let { playlists } = this.props.currentUser
         
        return (
            <div>
                <h1>My Playlists</h1>
                {
                    playlists.map(
                        playlist => 
                            <Link to="/playlistdetails">
                                <h2>{playlist.title}</h2>
                            </Link>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(PlaylistsContainer)