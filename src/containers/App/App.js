import React, {Component} from 'react';
import { Route, Switch } from "react-router-dom";

import { Helmet } from 'react-helmet';
import { withCookies } from "react-cookie";

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Home from '../Home/Loadable';
import LoginPage from '../LoginPage/Loadable';
import NotFound from '../../components/NotFound';

library.add(fas);

class App extends Component {

    render() {

        return (
            <div className="app-wrapper">

                <Helmet
                    titleTemplate="%s - Elnews"
                    defaultTitle="Elnews"
                >
                    <meta name="description" content="Elnewspaper" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Helmet>

                <Switch>
                    <Route
                        exact path ="/"
                        render={(props) => (<Home {...props} cookies={this.props.cookies} />) }
                    />
                    <Route path="/login" component={LoginPage}/>

                    {/* when none of the above match, <NotFound> will be rendered */}
                    <Route component={NotFound} />

                </Switch>
            </div>
        )
    }
}

export default withCookies(App);
