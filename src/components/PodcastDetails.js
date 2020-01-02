import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react'

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
            <div className="playlist-details-container">
                <h1 className="playlist-title playlist">
                    {title}
                </h1>
                <div className="episodes">
                    { 
                        episodes ? (
                            episodes.map(episode => 
                                <Header as='h2'>
                                    {console.log(episode)}
                                <Icon name='podcast'/>
                                <Header.Content className="episode-header">
                                    <Link className="diff-link" to={`/episodes/${episode.id}`}>
                                        {episode.title}
                                    </Link>
                                        <Header.Subheader className="text-color">
                                            <b>✿ {episode.description} </b>
                                        </Header.Subheader>
                                </Header.Content>
                                </Header>
                                )
                            ) : (
                                null
                                )
                    }
                </div>
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