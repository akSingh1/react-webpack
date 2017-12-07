import React, { Component, PropTypes } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';
import Feed from './Feed';
import Settings from './Settings';
import Profile from './Profile';

class AppContainer extends Component {

    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Feed}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/settings" component={Settings}/>
            </Router>
        );
    }

}

export default <AppContainer/>;
