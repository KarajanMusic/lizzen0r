import createHistory from 'history/createBrowserHistory';
import constants from 'utils/constants';

class Initialiser {
    constructor() {
        this.history = createHistory();
        this.initialState = {
            user:{},
        };
    }
}

export default new Initialiser();
