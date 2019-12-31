import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PodcastDetails extends React.Component {
    state = {
        podcast: {}
    }
    
    componentDidMount() {
        fetch("http://localhost:3000/podcastdetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: this.props.podcastId
            })
        })
        .then(resp => resp.json())
        .then(podcastObj => {
            this.setState({
                podcast: podcastObj
            })
        })
    }
     
    render() {
        const {id, image, title, publisher, episodes} = this.state.podcast

        return(
            <div>
                <h1>{title}</h1>
                {
                    episodes ? (
                        episodes.map(episode => 
                            <Link to={`/episodes/${episode.id}`}>
                                {episode.title}
                            </Link>)
                        ) : (
                            null
                            )
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults
    }
}

export default connect(mapStateToProps)(PodcastDetails)