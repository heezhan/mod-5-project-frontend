import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrentUser } from '../redux/actions/fetchCurrentUser';

class Login extends React.Component {
    
    state = {
        username: "",
        password: ""
    }

    onChangeLogin = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <h4>
                    Username
                    <input type="text" name="username" value={this.state.username} onChange={this.onChangeLogin} />
                </h4>
                <h4>
                    Password
                    <input type="password" name="password" value={this.state.password} onChange={this.onChangeLogin} />
                </h4>
                <button onClick={() => this.props.fetchCurrentUser(this.state)}>
                    Login
                </button>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchCurrentUser: (userObj) => dispatch(fetchCurrentUser(userObj))
    }
}

export default connect(null, mapDispatchToProps)(Login)