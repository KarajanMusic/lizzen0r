import React, { Component } from 'react';

import Header from './Header';

class Home extends Component {
    // static propTypes = {
    //     onConfirm: PropTypes.func.isRequired,
    //     onCancel: PropTypes.func.isRequired,
    //     message: PropTypes.string.isRequired,
    //     title: PropTypes.string.isRequired,
    // };

    constructor() {
        super();
    }

    componentWillMount() {
        console.log('will mount');
    }

    componentDidMount() {
        console.log('MOUNTED');
    }

    render() {
        const { user } = this.props;
        return (
            <div>
                <Header user={user} />
                Home Screen .......
                asd
            </div>
        );
    }
}

export default Home;