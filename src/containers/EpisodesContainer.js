import React from 'react';
import { connect } from 'react-redux';
import { clearSearchResults } from '../redux/actions/fetchSearchResults';
import EpisodeCard from '../components/EpisodeCard'


class EpisodesContainer extends React.Component {
    componentDidMount() {
        this.props.clearSearchResults([])
    }

    render() {
        return (
            <div className="container">
                {this.props.searchResults.map(episodeObj => 
                    <EpisodeCard 
                        key={episodeObj.id}
                        episodeObj={episodeObj}
                    />
                )}
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
        clearSearchResults: (emptyArr) => dispatch(clearSearchResults(emptyArr))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodesContainer)