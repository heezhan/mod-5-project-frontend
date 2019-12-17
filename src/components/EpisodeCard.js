import React from 'react';


class EpisodeCard extends React.Component {
    render() {
        let {thumbnail, title_original, podcast_title_original, publisher_original, audio} = this.props.episodeObj
      
        return (
            <div className="ui card four wide column margin-class">
                <img className="ui centered small image" src={thumbnail} />
                <div className="content">
                    <Link to={`/episodes/${id}`}>
                        <div className="header" onClick={null}>
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