import { addPlaylist } from './fetchPlaylist';
 
const addEpisode = (episode) => {
    return {type: "ADD_EPISODE", payload: episode}
}

const fetchEpisode = (playlistObj, episodeObj, id) => {
    let {podcast_id, thumbnail, image, podcast_title_original, title_original, publisher_original, description_original, audio} = episodeObj 

    return (dispatch) => {
        fetch("http://localhost:3000/episode", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            },
            body: JSON.stringify({
                api_id: id,
                podcast_id: podcast_id,
                thumbnail: thumbnail,
                image: image,
                podcast_title_original: podcast_title_original,
                title_original: title_original,
                publisher_original: publisher_original, 
                description_original: description_original,
                audio: audio,

                playlist_id: playlistObj.id 
            })
        })
        .then(resp => resp.json())
        .then(episode => { 
            dispatch(addEpisode(episode)) 

            let found = episode.playlists.find( ({id}) => id === playlistObj.id )
            debugger 
            dispatch(addPlaylist(found))
        })
    }
}

export { addEpisode, fetchEpisode } 