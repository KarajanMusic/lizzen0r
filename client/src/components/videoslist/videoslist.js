//await api.authenticate(credentials);

import React, { Component } from 'react';

import './videoslist.scss';
import api from '../../utils/api';

export default class VideosList extends Component {
    constructor() {
        super();
        this.state = {
            videos: null,
        };
        this.getVideos();
    }

    componentDidMount() {
        // console.log(window.GoogleAuth.isSignedIn.get());
        console.log('MOUNTED');
        console.log(this.props);
    }

    async getVideos() {
        try {
            const videos = await api.getVideos();
            console.log(videos);
            this.setState({ videos });
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { videos } = this.state;
        return videos ? videos.map(v => <li>{JSON.stringify(v)}</li>) : 'Loading videos...';
    }
}
