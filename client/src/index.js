/* eslint react/prop-types: 0 */

import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import registerServiceWorker from 'registerServiceWorker';
import Initialiser from 'initialiser';
import { isAuthenticated, isAdmin } from './utils/auth';

import AuthenticationWrapper from './components/AuthenticationWrapper';
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

// const renderRedirect = props => {
//     console.log('in here');
//     console.log(isAuthenticated());
//     if (isAuthenticated()) {
//         // if (props.fetching.indexOf('user') === -1) {
//             // Else, safe to render component
//             const { Component } = props;
//             return <Component {...props} />;
//         // }
//         // user object is being fetched
//         // return <p>Loading ...</p>;
//     }
//     // unauthenticated, redirect to login
//     return (
//         <Redirect
//             to={{
//                 pathname: '/login',
//                 state: { from: props.location },
//             }}
//         />
//     );
// };

function updateSigninStatus(isSignedIn) {
    console.log(isSignedIn);

    console.log('GOT CALLEd');

    // if (isSignedIn) {
    //     // isAuthorized = true;
    //     // if (currentApiRequest) {
    //     //     sendAuthorizedApiRequest(currentApiRequest);
    //     // }
    //     console.log('IN HERE');
    //     location.href = '/';
    //
    // } else {
    //     location.href = '/login';
    // }
}

// const connectGoogle = () => {
//     window.GoogleAuth; // Google Auth object.
//     function start() {
//         gapi.client.init({
//             'apiKey': 'AIzaSyAysq3hq5e6seJFkcyoun3s2-5HIRKCNgU',
//             'clientId': '1038963969656-a60janj4qrlnkv9mi1l8dp6tup0fgboq.apps.googleusercontent.com',
//             'scope': 'https://www.googleapis.com/auth/youtube',
//             'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
//         }).then(function () {
//             window.GoogleAuth = gapi.auth2.getAuthInstance();
//             // console.log(GoogleAuth);
//             // console.log(GoogleAuth.isSignedIn);
//             // console.log(window.GoogleAuth.isSignedIn.get());
//             // console.log(window.GoogleAuth.currentUser.get());
//             // console.log(GoogleAuth.getInitialScopes());
//
//             // updateSigninStatus(GoogleAuth.isSignedIn.get());
//             // GoogleAuth.signIn();
//
//             console.log('loaded google api');
//             const signedInStatus = GoogleAuth.isSignedIn.get();
//             if (!signedInStatus && (location.href.indexOf('login') < 0 )) {
//                 location.href = '/login';
//             }
//
//
//             // Listen for sign-in state changes.
//             window.GoogleAuth.isSignedIn.listen(updateSigninStatus);
//         });
//     }
//     gapi.load('client', start);
// };
// connectGoogle();

// const PrivateRoute = connect(mapStateToProps, null)(({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => renderRedirect(Object.assign(props, rest, { Component }))} />
// ));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <div className="view-container">
                    <AuthenticationWrapper />
                    {/*<Switch>*/}
                    {/*<Route exact path="/" component={Home} />*/}
                    {/*<Route exact path="/login" component={Login} />*/}
                    {/*<Route component={() => <h1>404 - Not Found</h1>} />*/}
                    {/*</Switch>*/}
                </div>
                {/*<Toaster />*/}
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
