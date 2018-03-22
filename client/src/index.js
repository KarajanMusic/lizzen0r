/* eslint react/prop-types: 0 */

import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Route, Redirect, Switch } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import registerServiceWorker from 'registerServiceWorker';
import Initialiser from 'initialiser';
import { isAuthenticated, isAdmin } from './utils/auth';
import store from 'ducks/configureStore';
import 'normalize.css';
import 'scss/index.scss';

injectTapEventPlugin();

// Listen to history changes
const history = Initialiser.history;
history.listen(location => {
    // Collect activity with google analytics
    ReactGA.pageview(location.pathname + location.search);
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
        return <Loader />;
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

const PrivateRoute = connect(mapStateToProps, null)(({ component: Component, ...rest }) => (
    <Route {...rest} render={props => renderRedirect(Object.assign(props, rest, { Component }))} />
));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Route path="/" render={() => isAuthenticated() && <Header />} />
                <div className="view-container">
                    <Loader />
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute exact path="/" component={Home} />
                        <PrivateRoute component={() => <h1>404 - Not Found</h1>} />
                    </Switch>
                </div>
                <Toaster />
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
