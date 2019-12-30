import React from 'react';
import { connect } from 'react-redux';
import { removeSearchResults } from '../redux/actions/fetchSearchResults';
import EpisodeCard from '../components/EpisodeCard'
import FiltersContainer from './FiltersContainer'


class EpisodesContainer extends React.Component {
    // componentDidMount() {
    //     this.props.removeSearchResults([])
    // }

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
        removeSearchResults: (emptyArray) => dispatch(removeSearchResults(emptyArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodesContainer)