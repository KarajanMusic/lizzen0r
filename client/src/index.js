/* eslint react/prop-types: 0 */

import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import registerServiceWorker from 'registerServiceWorker';
import Initialiser from 'initialiser';
import { isAuthenticated, isAdmin } from './utils/auth';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import store from 'ducks/configureStore';
import 'normalize.css';
import 'scss/index.scss';

injectTapEventPlugin();

// Listen to history changes
const history = Initialiser.history;
history.listen(location => {
    // Collect activity with google analytics
    // ReactGA.pageview(location.pathname + location.search);
});

const mapStateToProps = state => ({
    user: state.user,
    fetching: state.fetching,
});

const renderRedirect = props => {
    if (isAuthenticated()) {
        if (props.fetching.indexOf('user') === -1) {
            // Else, safe to render component
            const { Component } = props;
            return <Component {...props} />;
        }
        // user object is being fetched
        return <p>Loading ...</p>;
    }
    // unauthenticated, redirect to login
    return (
        <Redirect
            to={{
                pathname: '/login',
                state: { from: props.location },
            }}
        />
    );
};

/**
 * Listener called when user completes auth flow. If the currentApiRequest
 * variable is set, then the user was prompted to authorize the application
 * before the request executed. In that case, proceed with that API request.
 */
function updateSigninStatus(isSignedIn) {

    console.log(isSignedIn);

    if (isSignedIn) {
        isAuthorized = true;
        // if (currentApiRequest) {
        //     sendAuthorizedApiRequest(currentApiRequest);
        // }
    } else {
        isAuthorized = false;
    }
}

const googleConnect = () => {
    window.GoogleAuth; // Google Auth object.

    function start() {
        gapi.client.init({
            'apiKey': 'AIzaSyAysq3hq5e6seJFkcyoun3s2-5HIRKCNgU',
            'clientId': '1038963969656-a60janj4qrlnkv9mi1l8dp6tup0fgboq.apps.googleusercontent.com',
            'scope': 'https://www.googleapis.com/auth/youtube',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
        }).then(function () {
            window.GoogleAuth = gapi.auth2.getAuthInstance();
            console.log(GoogleAuth);
            console.log(GoogleAuth.isSignedIn);
            console.log(window.GoogleAuth.isSignedIn.get());
            console.log(window.GoogleAuth.currentUser.get());
            console.log(GoogleAuth.getInitialScopes());

            // GoogleAuth.signIn();

            // Listen for sign-in state changes.
            window.GoogleAuth.isSignedIn.listen(updateSigninStatus);
        });
    }
    gapi.load('client', start);


    // function start() {
    //     // 2. Initialize the JavaScript client library.
    //     gapi.client.init({
    //         'apiKey': 'YOUR_API_KEY',
    //         // Your API key will be automatically added to the Discovery Document URLs.
    //         'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    //         // clientId and scope are optional if auth is not required.
    //         'clientId': 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
    //         'scope': 'profile',
    //     }).then(function() {
    //         // 3. Initialize and make the API request.
    //         return gapi.client.people.people.get({
    //             'resourceName': 'people/me',
    //             'requestMask.includeField': 'person.names'
    //         });
    //     }).then(function(response) {
    //         console.log(response.result);
    //     }, function(reason) {
    //         console.log('Error: ' + reason.result.error.message);
    //     });
    // };
// 1. Load the JavaScript client library.

};


const PrivateRoute = connect(mapStateToProps, null)(({ component: Component, ...rest }) => (
    <Route {...rest} render={props => renderRedirect(Object.assign(props, rest, { Component }))} />
));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                {googleConnect()}
                <Route path="/" render={() => isAuthenticated() && <Header />} />
                <div className="view-container">
                    <p>Loading ...</p>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute component={() => <h1>404 - Not Found</h1>} />
                    </Switch>
                </div>
                {/*<Toaster />*/}
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
