import { Component } from 'react';

import Header from '../../components/header/header';
import VideosList from '../../components/videoslist/videoslist';

class Home extends Component {
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
                <VideosList />
            </div>
        );
    }
}

export default Home;
