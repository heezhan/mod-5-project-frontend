import React from 'react'
import { Link } from 'react-router-dom'

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

                    <div className="right menu">
                        <Link to="/login">
                            <a className="item">
                                Login
                            </a>
                        </Link>
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default NavBar