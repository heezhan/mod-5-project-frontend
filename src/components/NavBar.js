import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeCurrentUser } from '../redux/actions/fetchCurrentUser';
import { removeAllEpisodes } from '../redux/actions/fetchEpisode';
import { removeAllPlaylists} from '../redux/actions/fetchPlaylist';

class NavBar extends React.Component {
    handleLogout = () => {
        this.props.removeCurrentUser(null)
        this.props.removeAllEpisodes([])
        this.props.removeAllPlaylists([])
    }

    render() {
        return (
            <div className="navbar ui inverted segment">
                <div className="ui inverted secondary menu">

                    < Link to='/' >
                        <a className="item">
                            Home
                        </a>
                    </ Link >

                    < Link to='/about' >
                        <a className="item">
                            About
                        </a>
                    </ Link >

                    {this.props.currentUser ? (
                        < Link to='/playlists' >
                            <a className="item">
                                My Playlists 
                            </a>
                        </ Link >
                    ) : (
                        null
                    )}
                    

                    <div className="right menu">
                        {this.props.currentUser ? (
                            < Link to="/" >
                                <a 
                                    className="item" 
                                    onClick={this.handleLogout}>
                                    Logout
                                </a>
                            </ Link >
                        ) : (
                            <>
                                < Link to="/signup" >
                                    <a className="item">
                                        Sign up 
                                    </a>
                                </ Link >
    
                                < Link to="/login" >
                                    <a className="item">
                                        Log in
                                    </a>
                                </ Link >
                            </>
                        )}
                    </div>
                    
                </div>
            </div>
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
        removeAllPlaylists: (emptyArray) => dispatch(removeAllPlaylists(emptyArray))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)