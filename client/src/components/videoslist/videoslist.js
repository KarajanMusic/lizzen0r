//await api.authenticate(credentials);

import React, { Component } from 'react';

import './videoslist.scss';
import api from '../../utils/api';

export default class VideosList extends Component {
    constructor() {
        super();
        this.state = {
            videos: null,
            link: null,
            license_id: null,
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

    async buyLicense(isrc) {
        try {
            const result = await api.buyLicense(this.getUserID(), isrc);
            console.log(result);
            this.setState({
                license_id: result,
            });
            alert('You have been licensed to register a video with this recording!');
        } catch (err) {
            console.error(err);
        }
    }

    async registerVideo() {
        if (!this.state.link) {
            alert('You need to enter a youtube link!');
        } else if (!this.state.license_id) {
            alert('You need to buy a license first!');
        } else {
            try {
                const result = await api.registerVideo(this.getUserID(), this.state.link, this.state.license_id);
                console.log(result);
            } catch (err) {
                console.error(err);
            }
        }
    }

    setYoutubeLink(e) {
        this.setState({
            link: e.target.value,
        });
    }

    render() {
        const { videos } = this.state;
        if (!videos) {
            return <h2 className="videos-section-title">Loading videos...</h2>;
        }
        return (
            <div>
                <h2 className="videos-section-title">Buy music licence</h2>
                {videos.map(v => (
                    <div className="video-container" key={v.youtube_id}>
                        <h1>{v.title}</h1>
                        <iframe
                            width="853"
                            height="480"
                            src={'https://www.youtube.com/embed/' + v.youtube_id}
                            frameBorder="0"
                            allowFullScreen="true"
                        />
                        <button className="black" onClick={() => this.buyLicense(v.isrc)}>
                            Buy license
                        </button>
                    </div>
                ))}
                <hr />
                <h2 className="videos-section-title">Register licensed youtube video</h2>
                <p>Youtube Video Link:</p>
                <form>
                    <input type="text" onChange={e => this.setYoutubeLink(e)} />
                    <button className="black" onClick={() => this.registerVideo()}>
                        Register video
                    </button>
                </form>
            </div>
        );
    }
}
