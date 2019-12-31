// const addPodcastSearchResults = (searchResults) => {
//     return {type: "ADD_PODCAST_SEARCH_RESULTS", payload: searchResults}
// }

import { addSearchResults } from './fetchSearchResults';

const fetchPodcastSearchResults = (query) => {
    return (dispatch) => {
        fetch("http://localhost:3000/searchpodcasts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

export { fetchPodcastSearchResults }

// export { addPodcastSearchResults }