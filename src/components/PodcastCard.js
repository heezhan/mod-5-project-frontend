import React from 'react';
import { Link } from 'react-router-dom';
import { Popup } from 'semantic-ui-react';

class PodcastCard extends React.Component {
    render() {
        const {id, thumbnail, title_original, publisher_original} = this.props.podcastObj
        
        return (
            <div>
                <div className="cards-container">
                    <img className="image-size ui centered medium image" src={thumbnail} alt="thumbnail" />
                    <div className="lining content">
                        <Popup
                            trigger={
                                < Link to={`/podcasts/${id}`}>
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
                                        <b>by {publisher_original}</b>
                                    </div>
                                </div>
                            }
                            content={publisher_original}
                            inverted
                            position='bottom left'
                            size='tiny'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default PodcastCard