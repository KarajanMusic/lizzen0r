import React, { Component } from 'react';
import Header from './Header';
import './Login.scss';

class Login extends Component {

    constructor() {
        super();
    }

    // static propTypes = {
    //     onConfirm: PropTypes.func.isRequired,
    //     onCancel: PropTypes.func.isRequired,
    //     message: PropTypes.string.isRequired,
    //     title: PropTypes.string.isRequired,
    // };



    // }
    //
    // componentDidMount() {
    //
    // }

    signIn() {
        window.GoogleAuth.signIn();
    }

    render() {
        return (
            <div>
                <Header />
               <button className="login-button" onClick={() => this.signIn()}>Youtube Login</button>
            </div>
        );
    }
}

export default Login;