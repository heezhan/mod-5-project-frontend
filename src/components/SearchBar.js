import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchSearchResults } from '../redux/actions/fetchSearchResults';
import { fetchPodcastSearchResults } from '../redux/actions/fetchPodcastSearchResults';

class SearchBar extends React.Component {
    searchHandler = (event) => {
        event.preventDefault()

        if (this.props.activeFilter === "episodes") {
            this.props.fetchSearchResults(this.props.query)
            this.props.history.push(`/search/episodes/${this.props.query}`)
        } else {
            this.props.fetchPodcastSearchResults(this.props.query)
            this.props.history.push(`/search/podcasts/${this.props.query}`)
        }
    }

    render() {
        return (
            <div>
                < br /> 
                <form onSubmit={this.searchHandler}>
                    <div className="ui search">
                            <div className="ui huge left icon input">
                                <input 
                                    className="search-bar prompt"
                                    type="text" 
                                    placeholder="Search for episodes or podcasts"
                                    value={this.props.query} 
                                    onChange={this.props.onChangeSearch} 
                                />
                                <i className="search icon"/>
                            </div>
                    </div>
                </form>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return { 
      fetchSearchResults: (query) => dispatch(fetchSearchResults(query)),
      fetchPodcastSearchResults: (query) => dispatch(fetchPodcastSearchResults(query))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchBar))