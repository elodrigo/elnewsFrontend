import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { BrowserRouter as Router } from 'react-router-dom';

import { CookiesProvider } from 'react-cookie';

import App from './containers/App';

import createStore from './createStore';

const store = createStore();

ReactDOM.render(

    <CookiesProvider>
        <Router>
            <Provider store={store}>
                <App />
            </Provider>,
        </Router>
    </CookiesProvider>,

    document.getElementById('app')
);

