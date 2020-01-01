import React from 'react';
import { Link } from 'react-router-dom';

class PodcastCard extends React.Component {
    render() {
        const {id, thumbnail, title_original, publisher_original} = this.props.podcastObj
        
        return (
            <div>
                <div className="cards-container">
                    <img className="image-size ui centered medium image" src={thumbnail} alt="thumbnail" />
                    <div className="lining content">
                        < Link to={`/podcasts/${id}`} >
                            <h3 className="card-contents">
                                {title_original}
                            </h3>
                        </Link>
                        <div className="meta">
                            <div className="card-contents">
                                By {publisher_original}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PodcastCard