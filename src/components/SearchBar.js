import React from 'react';
import { connect } from 'react-redux';
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

    searchHandler = () => {
        this.props.fetchSearchResults(this.state.query)
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    value={this.state.query} 
                    onChange={this.onChangeSearch} 
                    placeholder="Search"
                />

                <button onClick={this.searchHandler}>
                    Search
                </button>
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