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
            case "CLEAR_SEARCH_RESULTS":
                return action.payload
            default:
                return searchResults
        }
    }

function  currentUserReducer(currentUser = null, action) {
    switch(action.type) {
        case "ADD_CURRENT_USER":
            return action.payload
        case "ADD_NEW_CURRENT_USER":
            return action.payload
        default:
            return currentUser
    }
}

function episodeReducer(allUserEpisodes = [], action) { 
    switch(action.type) {
        case "ADD_EPISODE":
            if (allUserEpisodes.find( ({id}) => id === action.payload.id )) {
                let filteredAllUserEpisodes = allUserEpisodes.filter(episode => episode.id !== action.payload.id)

                return [...filteredAllUserEpisodes, action.payload]
            } else {
                return [...allUserEpisodes, action.payload]
            }
        case "UPDATE_EPISODE":
            let copyOfAllUserEpisodes = [...allUserEpisodes]

            let foundEpisode = copyOfAllUserEpisodes.find( ({id}) => id === action.payload.id)

            let index = copyOfAllUserEpisodes.indexOf(foundEpisode)

            copyOfAllUserEpisodes.splice(index, 1, action.payload)

     
            return copyOfAllUserEpisodes
        case "REMOVE_EPISODE":
            let copyOfAllUserEpisodes2 = [...allUserEpisodes]

            let index2 = allUserEpisodes.indexOf(action.payload)

            copyOfAllUserEpisodes2.splice(index2, 1)

            return copyOfAllUserEpisodes2
        default:
            return allUserEpisodes
    }
}

function playlistReducer(allUserPlaylists = [], action) { 
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
        case "UPDATE_PLAYLIST":
             
            let copyOfAllUserPlaylists = [...allUserPlaylists]

            let foundPlaylist = copyOfAllUserPlaylists.find( ({id}) => id === action.payload.playlistObj.id)

            let foundEpisode = foundPlaylist.episodes.find(episode => episode.id === action.payload.episode.id)

            let index = foundPlaylist.episodes.indexOf(foundEpisode)

            foundPlaylist.episodes.splice(index, 1)

            return copyOfAllUserPlaylists
        default:
            return allUserPlaylists
    }
}
    
export default rootReducer