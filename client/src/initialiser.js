import createHistory from 'history/createBrowserHistory';

class Initialiser {
    constructor() {
        this.history = createHistory();
        this.initialState = {
            user: {},
        };
    }
}

export default new Initialiser();
