const updateEpisode = (episode) => {
    return {type: "UPDATE_EPISODE", payload: episode}
}

const removeEpisode = (episode) => {
    return {type: "REMOVE_EPISODE", payload: episode}
}

const updatePlaylist = (playlist) => {
    return {type: "UPDATE_PLAYLIST", payload: playlist}
}

const destroyPlaylistEpisode = (playlistObj, episodeObj) => { 
    return (dispatch) => {
        fetch(`http://localhost:3000/episodes/destroy`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                playlist_id: playlistObj.id,
                episode_id: episodeObj.id
            })
        })
        .then(resp => resp.json())
        .then(episode => {
            dispatch(updateEpisode(episode))  
            dispatch(updatePlaylist({episode, playlistObj}))
        })
    }
}

export { updateEpisode, removeEpisode, updatePlaylist, destroyPlaylistEpisode }