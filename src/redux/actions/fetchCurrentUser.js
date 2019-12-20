import { addPlaylist } from './fetchPlaylist';

const addCurrentUser = (userObj) => {
    return {type: "ADD_CURRENT_USER", payload: userObj}
}

const fetchCurrentUser = (userObj) => { 
    return (dispatch) => {
        fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            username: userObj.username,
            password: userObj.password
        })
        })
        .then(resp => resp.json())
        .then(userObj => {
            if (userObj.message) {
                alert(userObj.message)
            } else {
                dispatch(addCurrentUser(userObj))
                userObj.playlists.map(playlist => dispatch(addPlaylist(playlist)))
            }
        })
    }
}

export { fetchCurrentUser }