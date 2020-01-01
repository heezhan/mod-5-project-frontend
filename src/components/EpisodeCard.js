import React from 'react';
import { Link } from 'react-router-dom';


class EpisodeCard extends React.Component {
    render() {
        const {id, thumbnail, title_original, podcast_title_original, publisher_original, audio} = this.props.episodeObj
        
        return (
            <div className="cards-container">
                <img className="image-size ui centered medium image" src={thumbnail} alt="thumbnail" />
                <br/>
                <div className="lining content">
                    <Link to={`/episodes/${id}`}>
                        <h3 className="card-contents">
                            {title_original}
                        </h3>
                    </Link>
                    <div className="meta">
                        <div className="card-contents">
                            {podcast_title_original} 
                            <br/>
                            By {publisher_original}
                        </div>
                    </div>
                </div>
                {/* <div className="extra content">
                    <audio className="audio-size"
                        controls
                        src={audio}>
                            Your browser does not support the 
                            <code>audio</code> element.
                    </audio>
                </div> */}
            </div>
        )
    }
}

export default EpisodeCard