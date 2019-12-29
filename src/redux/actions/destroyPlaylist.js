const removePlaylist = (playlist) => {
    return {type: "REMOVE_PLAYLIST", payload: playlist}
}

const destroyPlaylist = (playlistId) => { 
    return (dispatch) => {
        fetch("http://localhost:3000/playlists/destroy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: playlistId
            })
        })
        .then(resp => resp.json())
        .then(playlist => dispatch(removePlaylist(playlist)))
    }
}

export { removePlaylist, destroyPlaylist }