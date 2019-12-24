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
    debugger 
    switch(action.type) {
        case "ADD_EPISODE":
            if (allUserEpisodes.find( ({id}) => id === action.payload.id )) {
                let filteredAllUserEpisodes = allUserEpisodes.filter(episode => episode.id !== action.payload.id)

                return [...filteredAllUserEpisodes, action.payload]
            } else {
                return [...allUserEpisodes, action.payload]
            }
        default:
            return allUserEpisodes
    }
}

function playlistReducer(allUserPlaylists = [], action) {
    debugger 
    switch(action.type) {
        case "ADD_PLAYLIST":
            if (allUserPlaylists.find( ({id}) => id === action.payload.id)) {
                let index = allUserPlaylists.findIndex(playlist => playlist.id === action.payload.id)

                let copyOfAllUserPlaylists = [...allUserPlaylists]

                copyOfAllUserPlaylists.splice(index, 1, action.payload)

                return copyOfAllUserPlaylists
            } else {
                return [...allUserPlaylists, action.payload]
            }
        default:
            return allUserPlaylists
    }
}
    
export default rootReducer