const addPlaylist = (playlist) => {
    return {type: "ADD_PLAYLIST", payload: playlist}
}

const removeAllPlaylists = (emptyArray) => {
    return {type: "REMOVE_ALL_PLAYLISTS", payload: emptyArray}
}

const fetchPlaylist = (playlistObj) => { 
    return (dispatch) => {
        fetch("http://localhost:3000/playlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                user_id: playlistObj.user_id,
                title: playlistObj.title
            })
        })
        .then(resp => resp.json())
        .then(playlist => dispatch(addPlaylist(playlist)))
    }
}

export { addPlaylist, removeAllPlaylists, fetchPlaylist }