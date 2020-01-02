import { addPlaylist } from './fetchPlaylist';
 
const addEpisode = (episode) => {
    return {type: "ADD_EPISODE", payload: episode}
}

const removeAllEpisodes = (emptyArray) => {
    return {type: "REMOVE_ALL_EPISODES", payload: emptyArray}
}

const fetchEpisode = (playlistObj, episodeObj, id) => {
    if (episodeObj.title_original !== undefined) 
    {let {podcast_id, thumbnail, image, podcast_title_original, title_original, publisher_original, description_original, audio} = episodeObj 

    return (dispatch) => {
        fetch("http://localhost:3000/episode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
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

            let foundPlaylist = episode.playlists.find( ({id}) => id === playlistObj.id )
             
            dispatch(addPlaylist(foundPlaylist))
        })}
    } else { 
        let {podcast, thumbnail, image, title, description, audio} = episodeObj 

        return (dispatch) => {
            fetch("http://localhost:3000/episode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    api_id: id,
                    podcast_id: podcast.id,
                    thumbnail: thumbnail,
                    image: image,
                    podcast_title_original: podcast.title,
                    title_original: title,
                    publisher_original: podcast.publisher, 
                    description_original: description,
                    audio: audio,

                    playlist_id: playlistObj.id 
                })
            })
            .then(resp => resp.json())
            .then(episode => { 
                dispatch(addEpisode(episode)) 

                let foundPlaylist = episode.playlists.find( ({id}) => id === playlistObj.id )
                
                dispatch(addPlaylist(foundPlaylist))
            })
        }
    }
}

export { addEpisode, removeAllEpisodes, fetchEpisode } 