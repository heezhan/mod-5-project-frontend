import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    searchResults: searchResultsReducer
})

function searchResultsReducer (searchResults = [], action) {
        switch (action.type) {
            case "ADD_SEARCH_RESULTS":
                return action.payload.results
            default:
                return searchResults
        }
    }
    
export default rootReducer