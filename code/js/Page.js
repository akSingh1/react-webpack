import React, { Component, PropTypes } from 'react';
import { Router, browserHistory, Route, Link } from 'react-router';


const Page = ({ title }) => (
    <div className="App">
        <div className="header">
            <div className="appTitle">Inpix</div>
            <h2>{title}</h2>
        </div>
        <p className="App-intro content">
            This is the {title} page.
        </p>
        <div className='footer'>
            <div className="fl">
                <Link to="/settings">Settings</Link>
            </div>
            <div className="fl">
                <Link to="/">Feed</Link>
            </div>
            <div className="fl">
                <Link to="/profile">Profile</Link>
            </div>
        </div>

    </div>
);

export default Page;

