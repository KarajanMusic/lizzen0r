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
        this.getVideos = this.getVideos.bind(this);
    }

    componentDidMount() {
        // console.log(window.GoogleAuth.isSignedIn.get())
        this.getVideos();
    }

    async getVideos() {
        try {
            const videos = await api.getVideos();
            this.setState({ videos });
        } catch (err) {
            console.error(err);
        }
    }

    getUserID() {
        return window.GoogleAuth.currentUser.get().El;
    }

    async buyLicence(isrc) {
        try {
            const result = await api.buyLicence(this.getUserID(), v.isrc);
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }

    async registerVideo(link) {
        try {
            const result = await api.buyLicence(this.getUserID(), link);
            console.log(result);
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const { videos } = this.state;
        return !videos
            ? 'Loading videos...'
            : videos.map(v => (
                  <div className="video-container" key={v.youtube_id}>
                      <h1>{v.title}</h1>
                      <iframe
                          width="853"
                          height="480"
                          src={'https://www.youtube.com/embed/' + v.youtube_id}
                          frameBorder="0"
                          allowFullScreen="true"
                      />
                      <button onClick={() => this.buyLicence(v.isrc)}>Buy licence</button>
                  </div>
              ));
    }
}
