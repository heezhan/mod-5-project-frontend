import React from 'react';
import { Link } from 'react-router-dom';

class EpisodeCard extends React.Component {
    render() {
        const {id, thumbnail, title_original, podcast_title_original, publisher_original, audio} = this.props.episodeObj
        
        return (
            <div className="episode-card">
                <img className="ui centered small image" src={thumbnail} alt="thumbnail" />
                <div className="content">
                    <Link to={`/episodes/${id}`}>
                        <div className="header">
                            {title_original}
                        </div>
                    </Link>
                    <div className="meta">
                        <span className="date">
                            {podcast_title_original} 
                            <br/>
                            By {publisher_original}
                        </span>
                    </div>
                </div>
                <div className="extra content">
                    <audio className="audio-size"
                        controls
                        src={audio}>
                            Your browser does not support the 
                            <code>audio</code> element.
                    </audio>
                </div>
            </div>
        )
    }
}

export default EpisodeCard