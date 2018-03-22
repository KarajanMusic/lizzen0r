import axios from 'axios';
import { getAuthHeader } from './auth';

class API {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        };
    }

    request(method, url, params, data) {
        return axios
            .request({
                method,
                url: `/api/${url}`,
                params,
                data,
                headers: Object.assign(this.headers, {
                    Authorization: getAuthHeader(),
                }),
            })
            .then(response => response.data)
            .catch(error => {
                throw error.response;
            });
    }

    getVideos() {
        return this.request('GET', 'videos');
    }

    postUser(user) {
        return this.request('POST', 'users', null, {
            user,
        });
    }

    buyLicence(user_id, isrc) {
        return this.request('POST', 'videos/buy', null, {
            user_id,
            isrc,
        });
    }

    registerVideo(user_id, link) {
        return this.request('POST', 'videos/register', null, {
            user_id,
            link,
        });
    }
}

export default new API();
