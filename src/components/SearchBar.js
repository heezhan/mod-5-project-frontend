import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { fetchSearchResults } from '../redux/actions/fetchSearchResults';

class SearchBar extends React.Component {
    state = {
        query: ""
    }

    onChangeSearch = (event) => {
        this.setState({
            query: event.target.value
        })
    }

    searchHandler = (event) => {
        event.preventDefault()
      
        this.props.fetchSearchResults(this.state.query)
        if (this.props.activeFilter === "episodes") {
            this.props.history.push(`/search/episodes/${this.state.query}`)
        } else {
            this.props.history.push(`/search/podcasts/${this.state.query}`)
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.searchHandler}>
                    <div className="ui search">
                            <div className="ui huge left icon input">
                                <input 
                                    className="prompt"
                                    type="text" 
                                    placeholder="Search by episodes or podcasts"
                                    value={this.state.query} 
                                    onChange={this.onChangeSearch} 
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
      fetchSearchResults: (query) => dispatch(fetchSearchResults(query))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchBar))