import React from 'react';
import { connect } from 'react-redux';
import { Segment, Button, Form, Input, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
            <div className="login-page">
                <Segment basic textAlign='center'>
                    <Form 
                        size="large"
                        onSubmit={() => this.props.fetchCurrentUser(this.state)}>
                        <Input 
                            type="text"
                            icon="user"
                            iconPosition="left"
                            placeholder="Username"
                            name="username" 
                            value={this.state.username} 
                            onChange={this.onChangeLogin}
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
                            onChange={this.onChangeLogin}
                        />
                        <br />
                        <br />
                        <Button  
                            type="submit"
                            content="Login"
                        />
                    </Form>

                    <br/>
                    <Divider horizontal>Or</Divider>
                    <br/>
                    
                    <Link to={"/signup"}>
                        <Button 
                            type="click"
                            content="Sign Up for Podcastr"
                        />
                    </Link>
                </Segment>
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