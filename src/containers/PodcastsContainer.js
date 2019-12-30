import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeSearchResults, fetchSearchResults } from '../redux/actions/fetchSearchResults';
// import PodcastCard from '../components/PodcastCard'

class PodcastsContainer extends React.Component {
    componentDidMount() {
        this.props.fetchSearchResults(this.props.match.params.query)
    }

    render() {
        return (
            <div>
                < br />
                <h1>PodcastsContainer</h1>
                <div className="container">
                    {/* {this.props.searchResults.map(episodeObj => 
                        <EpisodeCard 
                            key={episodeObj.id}
                            episodeObj={episodeObj}
                        />
                    )} */}
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
        fetchSearchResults:(query) => dispatch(fetchSearchResults(query))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PodcastsContainer))