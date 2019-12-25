const removeEpisode = (episode) => {
    return {type: "REMOVE_EPISODE", payload: episode}
}

const updatePlaylist = (playlist) => {
    return {type: "UPDATE_PLAYLIST", payload: playlist}
}

const destroyPlaylistEpisode = (playlistObj, episodeObj) => { 
    return (dispatch) => {
        fetch(`http://localhost:3000/episodes/delete`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            "Accept": "application/json"
        },
        body: JSON.stringify({
            playlist_id: playlistObj.id,
            episode_id: episodeObj.id
        })
        })
        .then(resp => resp.json())
        .then(episode => {
            console.log(episode)
            dispatch(removeEpisode(episode)) 
            debugger 
            dispatch(updatePlaylist({episode, playlistObj}))
        })
    }
}

export { removeEpisode, updatePlaylist, destroyPlaylistEpisode }