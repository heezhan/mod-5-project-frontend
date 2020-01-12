import React from 'react';
import { connect } from 'react-redux';
import { Button, Popup, Checkbox, Divider, Input, Form } from 'semantic-ui-react';
import { fetchEpisode } from '../redux/actions/fetchEpisode';
import { fetchPlaylist } from '../redux/actions/fetchPlaylist';
import { destroyPlaylistEpisode } from '../redux/actions/destroyPlaylistEpisode';
import { removeEpisode } from '../redux/actions/destroyPlaylistEpisode'
import ReactHtmlParser from 'react-html-parser';

class EpisodeDetails extends React.Component {
    state = {
        selectedPlaylists: [],
        title: "",
        stateEpisode: null,
        episodeObj: undefined,
        id: undefined,
        notes: ""
    }

    onChangeNotes = (event) => {
        this.setState({
            notes: event.target.value 
        })
    }

    notesSubmitHandler = (event, episodeObj) => {
        event.preventDefault()
        console.log("episode", episodeObj)
        fetch("http://localhost:3000/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                id: episodeObj.id,
                notes: this.state.notes 
            })
        })
        .then(resp => resp.json())
        .then(wtf => console.log(wtf))
    }

    clickHandler = () => {
        this.props.fetchPlaylist({user_id: this.props.currentUser.id, title: this.state.title})
        this.setState({
            title: ""
        })
    }

    onChangeTitle = (event) => {
        this.setState({
            title: event.target.value
        }) 
    }

    toggleCheckbox = (playlistObj, episodeObj, id) => {  
        console.log(playlistObj, episodeObj, id)
        if (episodeObj.playlists === undefined || episodeObj.playlists.find(({id}) => id === playlistObj.id ) === undefined) { 
            this.props.fetchEpisode(playlistObj, episodeObj,id)
        } else {  
            this.props.destroyPlaylistEpisode(playlistObj, episodeObj, id)
        }
    }

    renderPopup = (episodeObj, id) => { 
        return <Popup 
        content={ 
            this.props.currentUser ? 
            (   this.props.allUserPlaylists.length > 0 ?  
                (
                    <div>
                        {this.props.allUserPlaylists.map(playlistObj => 
                            <div>
                                <Checkbox
                                    label={<label className="text-color">{playlistObj.title}</label>}
                                    value={playlistObj.id}
                                    onChange={
                                        () => this.toggleCheckbox(playlistObj, episodeObj, id)
                                    }
                                    checked={playlistObj.episodes.find( ({id}) => id === episodeObj.id) ? (true) : (false)}
                                />
                                <br/>
                            </div>
                        )}
                        < Divider />
                        <Form>
                            <Input
                                type="text" 
                                placeholder="Title" 
                                value={this.state.title} 
                                onChange={this.onChangeTitle}
                            />
                            <center>
                                <Button 
                                    onClick={this.clickHandler}
                                    content="Create a playlist"
                                    basic color="white"
                                    inverted 
                                />
                            </center>
                        </Form>
                      
                    </div>
                ) : (
                    <div>
                        <center>No playlists yet</center>
                        < Divider />
                        <Form>
                            <Input 
                                type="text" 
                                placeholder="Title" 
                                value={this.state.title} 
                                onChange={this.onChangeTitle}
                            />
                            <center>
                                <Button 
                                    onClick={this.clickHandler}
                                    content="Create a playlist"
                                    basic color="white"
                                    inverted 
                                />
                            </center>
                        </Form>
                    </div>
                )
            ) : (
                // create an alert
                "Not logged in"
            )
        }
        on="click"
        pinned 
        position="bottom center"
        trigger={
            <Button icon="add" content="Add to Playlist" basic color="white" inverted/>
        }
        inverted
        size='huge'
        />
    }

    componentDidMount() {
        // let episodeObj
        let userEpisode = this.props.allUserEpisodes.find( ({api_id}) => api_id === this.props.apiId )
        // let id 
        console.log("mounted again")

        if (userEpisode) {
            if (this.props.allUserEpisodes.filter(episode => episode.api_id === userEpisode.api_id).length > 1) {
               
                this.setState({ episodeObj: this.props.allUserEpisodes.find( episode => episode.playlists === undefined )}, () => {
                    this.setState({id: this.state.episodeObj.api_id})
                } )
                // this.props.removeEpisode(this.state.episodeObj) 
            } else {
              
                this.setState({episodeObj: userEpisode}, () => {
                    this.setState({id: this.state.episodeObj.api_id})
                })
            }
        } else if (this.props.searchResults.find( ({id}) => id === this.props.apiId )) {
                
            this.setState({episodeObj: this.props.searchResults.find( ({id}) => id === this.props.apiId )}, () => {
                this.setState({id: this.state.episodeObj.id})})
        } else {
            fetch("http://localhost:3000/episodedetails", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    id: this.props.apiId 
                })
            })
            .then(resp => resp.json())
            .then(episode => this.setState({
                stateEpisode: episode
            }))
        }
    }
    
    render() {
        let episodeObj
        let userEpisode = this.props.allUserEpisodes.find( ({api_id}) => api_id === this.props.apiId )
        let id 

        if (userEpisode) {
            if (this.props.allUserEpisodes.filter(episode => episode.api_id === userEpisode.api_id).length > 1) {
                episodeObj = this.props.allUserEpisodes.find( episode => episode.playlists === undefined )
                this.props.removeEpisode(episodeObj) 
            } else {
                episodeObj = userEpisode 
            }
            id = episodeObj.api_id
        } else if (this.props.searchResults.find( ({id}) => id === this.props.apiId )) {
            episodeObj = this.props.searchResults.find( ({id}) => id === this.props.apiId )
            id = episodeObj.id
        } 

        console.log(episodeObj, id)

        return (
            this.state.episodeObj !== undefined? 
            ( 
            <div className="padding">
                {console.log("im in here")}
                <div className="details-card">
                    <div className="name">
                        <img className="image-size ui centered small image" src={episodeObj.thumbnail} alt="thumbnail" />
                        <h2 className="header-font">{episodeObj.title_original}</h2>
                        <h3>from {episodeObj.podcast_title_original} <br/> by {episodeObj.publisher_original}</h3>
                        <audio className="audio-size"
                                controls
                                src={episodeObj.audio}>
                                    Your browser does not support the 
                                    <code>{episodeObj.audio}</code> element.
                        </audio>
                        <div className="title">
                            <br/>
                            {this.renderPopup(episodeObj, id)}
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        {this.props.currentUser && episodeObj.notes || episodeObj.notes === "" ? (
                            <div>
                                {episodeObj.notes}
                                <Form onSubmit={(event) => this.notesSubmitHandler(event, episodeObj)}> 
                                    <Input
                                        type="textarea"
                                        name="notes"
                                        placeholder="Notes"
                                        value={this.state.notes}
                                        onChange={this.onChangeNotes}
                                    />
                                    <br/>
                                    <br />
                                    <Button 
                                        type="submit"
                                        content="Submit"
                                        basic color="white"
                                        inverted
                                    />
                                </Form>
                            </div>
                        ) : (
                            console.log("denied access to notes")
                        )}
                    </div>
                    <div className="details">
                        <h3>
                        About This Episode <br/><br/>
                        {ReactHtmlParser (episodeObj.description_original)}</h3>
                    </div>
                </div>
            </div>
            ) : (
                this.state.stateEpisode ? (<div className="padding">
                {console.log("here instead")}
                <div className="details-card">
                    <div className="name">
                        <img className="image-size ui centered small image" src={this.state.stateEpisode.thumbnail} alt="thumbnail" />
                        <h1 className="header-font">{this.state.stateEpisode.title}</h1>
                        <h3>from {this.state.stateEpisode.podcast.title} <br/> by {this.state.stateEpisode.podcast.publisher}</h3>
                        <audio className="audio-size"
                                controls
                                src={this.state.stateEpisode.audio}>
                                    Your browser does not support the 
                                    <code>{this.state.stateEpisode.audio}</code> element.
                        </audio>
                        <div className="title">
                            <br/>
                            {episodeObj ? (this.renderPopup(episodeObj, id)) : (this.renderPopup(this.state.stateEpisode, this.state.stateEpisode.id))}
                        </div>
                    </div>
                    <div className="details">
                        <h3>About This Episode <br/><br/>
                        { ReactHtmlParser (this.state.stateEpisode.description)}</h3>
                    </div>
                </div>
            </div>) : (null)
            ) 
        ) 
    }
}

function mapStateToProps(state) {
    return {
        searchResults: state.searchResults,
        currentUser: state.currentUser,
        allUserPlaylists: state.allUserPlaylists,
        allUserEpisodes: state.allUserEpisodes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEpisode: (playlistObj, episodeObj, id) => dispatch(fetchEpisode(playlistObj, episodeObj, id)),
        fetchPlaylist: (playlistObj) => dispatch(fetchPlaylist(playlistObj)),
        destroyPlaylistEpisode: (playlistObj, episodeObj, id) => dispatch(destroyPlaylistEpisode(playlistObj, episodeObj, id)),
        removeEpisode: (episode) => dispatch(removeEpisode(episode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeDetails)
