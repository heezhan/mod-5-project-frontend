import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCurrentUser } from '../redux/actions/fetchCurrentUser';
import { removeAllEpisodes } from '../redux/actions/fetchEpisode';
import { removeAllPlaylists} from '../redux/actions/fetchPlaylist';
import { removeSearchResults } from '../redux/actions/fetchSearchResults'
import { Segment, Menu } from 'semantic-ui-react';

class NavBar extends React.Component {
    state = {
        activeItem: ""
    }

    handleItemClick = (event) => { 
        this.setState({
            activeItem: event.target.text
        })
    }
    
    handleHomeButton = (event) => {
        this.handleItemClick(event)
        this.props.removeSearchResults([])
    }

    handleLogout = (event) => {
        this.handleItemClick(event)
        this.props.removeCurrentUser(null)
        this.props.removeAllEpisodes([])
        this.props.removeAllPlaylists([])
    }

    render() {
        return (
            < Segment inverted >
                < Menu inverted pointing secondary size="huge" >

                    < Link to="/" >
                        < Menu.Item 
                            content="Home"
                            active={this.state.activeItem === "Home"}
                            onClick={(event) => this.handleHomeButton(event)}
                        />
                    </ Link >

                    < Link to="/about" >
                        < Menu.Item 
                            content="About"
                            active={this.state.activeItem === "About"}
                            onClick={this.handleItemClick}
                        />
                    </ Link >

                    {this.props.currentUser ? (
                        < Link to="/playlists" >
                            < Menu.Item 
                                content="My Playlists"
                                active={this.state.activeItem === "My Playlists"}
                                onClick={(event) => this.handleItemClick(event)}
                            />
                        </ Link >
                    ) : (
                        null
                    )}

                    <div className="right menu">
                        {this.props.currentUser ? (
                            < Link to="/" >
                                < Menu.Item 
                                    content="Log Out"
                                    active={this.state.activeItem === "Log Out"}
                                    onClick={this.handleLogout}
                                />
                            </ Link >
                        ) : (
                            <>
                                < Link to="/signup" >
                                    < Menu.Item 
                                        content="Sign Up"
                                        active={this.state.activeItem === "Sign Up"}
                                        onClick={this.handleItemClick}
                                    />
                                </ Link >
    
                                < Link to="/login" >
                                    < Menu.Item 
                                        content="Log In"
                                        active={this.state.activeItem === "Log In"}
                                        onClick={this.handleItemClick}
                                    />
                                </ Link >
                            </>
                        )}
                    </div>
                    
                </ Menu >
            </ Segment >
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeCurrentUser: (nullUser) => dispatch(removeCurrentUser(nullUser)),
        removeAllEpisodes: (emptyArray) => dispatch(removeAllEpisodes(emptyArray)),
        removeAllPlaylists: (emptyArray) => dispatch(removeAllPlaylists(emptyArray)),
        removeSearchResults: (emptyArray) => dispatch(removeSearchResults(emptyArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)