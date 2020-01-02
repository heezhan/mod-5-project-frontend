import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Form, Input } from 'semantic-ui-react';
import { fetchNewCurrentUser } from '../redux/actions/fetchNewCurrentUser';

class Signup extends React.Component {
    state = {
        username: "",
        password: ""
    }

    onChangeSignup = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="login-page">
                <Segment basic textAlign='center'>
                    <Form 
                        size="large"
                        onSubmit={() => this.props.fetchNewCurrentUser(this.state)}>
                        <Input 
                            type="text"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            name="username" 
                            value={this.state.username} 
                            onChange={this.onChangeSignup}
                        />
                        <br />
                        <br />
                        <Input 
                            type="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder="Password" 
                            name="password" 
                            value={this.state.password} 
                            onChange={this.onChangeSignup}
                        />
                        <br />
                        <br />
                        <Button  
                            type="submit"
                            content="Sign Up"
                            basic color="white"
                            inverted 
                        />
                    </Form>
                </Segment>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchNewCurrentUser: (userObj) => dispatch(fetchNewCurrentUser(userObj))
    }
}

export default connect(null, mapDispatchToProps)(Signup)