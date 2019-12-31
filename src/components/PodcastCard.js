import React from 'react';
import { Link } from 'react-router-dom';

class PodcastCard extends React.Component {
    render() {
        const {id, thumbnail, title_original, publisher_original} = this.props.podcastObj
        
        return (
            <div>
                <div className="card-container">
                    <img className="ui centered small image" src={thumbnail} alt="thumbnail" />
                    <div className="content">
                        < Link to={`/podcasts/${id}`} >
                            <div className="header">
                                {title_original}
                            </div>
                        </Link>
                        <div className="meta">
                            <span className="date">
                                By {publisher_original}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PodcastCard