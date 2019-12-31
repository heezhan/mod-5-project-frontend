import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchPodcastSearchResults } from '../redux/actions/fetchPodcastSearchResults';
import PodcastCard from '../components/PodcastCard'

class PodcastsContainer extends React.Component {
    componentDidMount() {  
        this.props.fetchPodcastSearchResults(this.props.match.params.query)
    }

    render() {
        // console.log(this.props.searchResults)
        return (
            <div>
                < br />
                <div className="container">
                    {this.props.searchResults.map(podcastObj => 
                        <PodcastCard 
                            key={podcastObj.id}
                            podcastObj={podcastObj}
                        />
                    )}
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

function mapDispatchToProps(dispatch) {
    return {
        fetchPodcastSearchResults:(query) => dispatch(fetchPodcastSearchResults(query))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PodcastsContainer))