import { Component } from 'react';
import Header from '../../components/header/header';
import './login.scss';

class Login extends Component {
    signIn() {
        window.GoogleAuth.signIn();
    }

    render() {
        return (
            <div>
                <Header />
                <button className="login-button" onClick={() => this.signIn()}>
                    Youtube Login
                </button>
            </div>
        );
    }
}

export default Login;
