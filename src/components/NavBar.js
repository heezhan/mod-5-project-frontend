import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

class NavBar extends React.Component {
    render() {
        return (
            <div className="ui inverted segment">
                <div className="ui inverted secondary menu">

                    <Link to='/'>
                        <a className="item">
                            Home
                        </a>
                    </Link>

                    <a className="item">
                        About
                    </a>

                    {this.props.currentUser ? (
                        <Link to='/playlists'>
                            <a className="item">
                                My Playlists 
                            </a>
                        </Link>
                    ) : (
                        null
                    )}
                    

                    <div className="right menu">
                        {this.props.currentUser ? (
                        // dispatch an action to set the currentUser state to null
                                <a className="item">
                                    Logout
                                </a>

                        ) : (
                            <Link to="/login">
                                <a className="item">
                                    Login
                                </a>
                            </Link>
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

export default connect(mapStateToProps)(NavBar)