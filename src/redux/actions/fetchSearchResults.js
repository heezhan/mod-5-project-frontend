const addSearchResults = (searchResults) => {
    return {type: "ADD_SEARCH_RESULTS", payload: searchResults}
}

const fetchSearchResults = (query) => {
    return (dispatch) => {
        fetch("http://localhost:3000/search", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                query: query
            })
        })
        .then(resp => resp.json())
        .then(searchResults => {
            dispatch(addSearchResults(searchResults))
        })
    }
}

export { fetchSearchResults }

