import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';


class EpisodeCard extends React.Component {
    render() {
        const {id, thumbnail, title_original, podcast_title_original, publisher_original, audio} = this.props.episodeObj
        
        return (
            <div className="cards-container">
                <img className="image-size ui centered medium image" src={thumbnail} alt="thumbnail" />
                <div className="lining content">
                    <Popup
                        trigger={
                            <Link to={`/episodes/${id}`}>
                                <h3 className="link card-contents">
                                    {title_original}
                                </h3>
                            </Link>
                        }
                        content={title_original}
                        inverted
                        position='bottom left'
                        size='tiny'
                    />
                    <Popup
                        trigger={
                            <div className="meta">
                                <div className="text-color card-contents">
                                    
                                        from {podcast_title_original} 
                                        <br/>
                                        by {publisher_original}
                                    
                                </div>
                            </div>
                        }
                        content={`${podcast_title_original} by ${publisher_original}`}
                        inverted
                        position='bottom left'
                        size='tiny'
                    />
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