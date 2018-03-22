import { Component } from 'react';

import './videoslist.scss';
import api from '../../utils/api';

export default class VideosList extends Component {
    constructor() {
        super();
        this.state = {
            videos: null,
            link: null,
            license_id: null,
            loading: false,
            license_block: null,
            registration_block: null,
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
            this.setState({ loading: true });
            const result = await api.buyLicense(this.getUserID(), isrc);
            console.log(result);
            this.setState({
                license_id: result.licenseId,
                loading: false,
                license_block: {
                    block_hash: result.result.blockHash,
                    tx_hash: result.result.transactionHash,
                },
            });
            alert('You have been licensed to register a video with this recording!');
        } catch (err) {
            console.error(err);
        }
    }

    async registerVideo(e) {
        e.preventDefault();
        if (!this.state.link) {
            return alert('You need to enter a youtube link!');
        }
        if (!this.state.license_id) {
            return alert('You need to buy a license first!');
        }
        try {
            this.setState({ loading: true });
            const result = await api.registerVideo(this.getUserID(), this.state.link, this.state.license_id);
            this.setState({
                loading: false,
                registration_block: {
                    block_hash: result.result.blockHash,
                    tx_hash: result.result.transactionHash,
                },
            });
            alert('Your video has been registered!');
            console.log(result);
        } catch (err) {
            console.error(err);
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
                <div className={'spinner-container' + (this.state.loading ? ' show' : ' hide')}>
                    <div className="spinner">
                        <p>Please wait...</p>
                        <div className="rect1" />
                        <div className="rect2" />
                        <div className="rect3" />
                        <div className="rect4" />
                        <div className="rect5" />
                    </div>
                </div>
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
                <h3 className="videos-section-title">License blockchain info</h3>
                <p>
                    Ethereum Kovan Block Hash: {this.state.license_block ? this.state.license_block.block_hash : 'N.D.'}
                </p>
                <p>
                    Ethereum Kovan Transaction Hash:{' '}
                    {this.state.license_block ? (
                        <a href={'https://kovan.etherscan.io/tx/' + this.state.license_block.tx_hash} target="_blank">
                            {this.state.license_block.tx_hash}
                        </a>
                    ) : (
                        'N.D.'
                    )}
                </p>
                <hr />
                <h2 className="videos-section-title">Register licensed youtube video</h2>
                <p>Youtube Video Link:</p>
                <form>
                    <input type="text" onChange={e => this.setYoutubeLink(e)} />
                    <button className="black" onClick={e => this.registerVideo(e)}>
                        Register video
                    </button>
                </form>
                <hr />
                <h3 className="videos-section-title">Video registration blockchain info</h3>
                <p>
                    Ethereum Kovan Block Hash:{' '}
                    {this.state.registration_block ? this.state.registration_block.block_hash : 'N.D.'}
                </p>
                <p>
                    Ethereum Kovan Transaction Hash:{' '}
                    {this.state.registration_block ? (
                        <a
                            href={'https://kovan.etherscan.io/tx/' + this.state.registration_block.tx_hash}
                            target="_blank">
                            {this.state.registration_block.tx_hash}
                        </a>
                    ) : (
                        'N.D.'
                    )}
                </p>
                <br />
                <br />
            </div>
        );
    }
}
