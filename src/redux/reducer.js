import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    searchResults: searchResultsReducer,
    currentUser: currentUserReducer,
    allUserEpisodes: episodeReducer,
    allUserPlaylists: playlistReducer
})

function searchResultsReducer(searchResults = [], action) {
        switch (action.type) {
            case "ADD_SEARCH_RESULTS":
                return action.payload.results
            default:
                return searchResults
        }
    }

function  currentUserReducer(currentUser = null, action) {
    switch(action.type) {
        case "ADD_CURRENT_USER":
            return action.payload
        default:
            return currentUser
    }
}

function episodeReducer(allUserEpisodes = [], action) {
    switch(action.type) {
        case "ADD_EPISODE":
            return [...allUserEpisodes, action.payload]
        default:
            return allUserEpisodes
    }
}

function playlistReducer(allUserPlaylists = [], action) {
    switch(action.type) {
        case "ADD_PLAYLIST":
            return [...allUserPlaylists, action.payload]
        default:
            return allUserPlaylists
    }
}
    
export default rootReducer