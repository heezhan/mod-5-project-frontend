const editPlaylist = (titleObj) => {
    return {type: "EDIT_PLAYLIST", payload: titleObj}
}

const updatePlaylist = (playlistId, title) => {   
    return (dispatch) => {
        fetch("http://localhost:3000/playlists/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: playlistId,
                title: title
            })
        })
        .then(resp => resp.json())
        .then(playlist => dispatch(editPlaylist(playlist)))
    }
}

export { editPlaylist, updatePlaylist }