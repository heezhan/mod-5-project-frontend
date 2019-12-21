import React from 'react';
import { Link } from 'react-router-dom';

class PlaylistCard extends React.Component {
    render() {
        const { id, title } = this.props.playlist 

        return (
            <div>
                <h2>
                    <Link to={`/playlists/${id}`}>
                        {title}
                    </Link>
                </h2>
            </div>
        )
    }
}

export default PlaylistCard