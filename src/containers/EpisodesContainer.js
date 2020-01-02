import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchSearchResults } from '../redux/actions/fetchSearchResults';
import EpisodeCard from '../components/EpisodeCard';

class EpisodesContainer extends React.Component {
    componentDidMount() { 
        this.props.fetchSearchResults(this.props.match.params.query)
    }

    render() {
        return (
            <div>
                < br />
                <div className="container">
                    {this.props.searchResults.map(episodeObj => 
                        <EpisodeCard 
                            key={episodeObj.id}
                            episodeObj={episodeObj}
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
        fetchSearchResults:(query) => dispatch(fetchSearchResults(query))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EpisodesContainer))