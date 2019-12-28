import React from 'react';
import { connect } from 'react-redux';
import { fetchSearchResults } from '../redux/actions/fetchSearchResults';
import { Search } from 'semantic-ui-react'

class SearchBar extends React.Component {
    state = {
        query: ""
    }

    componentDidMount() {
        // dispatch an action to clear state for searchResults
    }

    onChangeSearch = (event) => {
        this.setState({
            query: event.target.value
        })
    }

    searchHandler = (event) => {
        event.preventDefault()
        this.props.fetchSearchResults(this.state.query)
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

export default connect(null, mapDispatchToProps)(SearchBar)