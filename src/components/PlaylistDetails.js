import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PlaylistDetails extends React.Component {
    render() {
        const playlistId = this.props.id

        const foundPlaylist = this.props.allUserPlaylists.find( ({id}) => id === playlistId )

        debugger 

        return (
            <div>
                {
                    foundPlaylist.episodes.map(
                        episode => 
                            <Link to={`/episodes/${episode.api_id}`}>
                                <h2>{episode.title_original}</h2>
                            </Link>
                    )
                }
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

export default connect(mapStateToProps)(PlaylistDetails)