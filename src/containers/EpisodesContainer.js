import React from 'react';
import { connect } from 'react-redux';
import EpisodeCard from '../components/EpisodeCard'


class EpisodesContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.searchResults.map(episodeObj => <EpisodeCard key={episodeObj.id} episodeObj={episodeObj}/>)}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults
    }
}

export default connect(mapStateToProps)(EpisodesContainer)