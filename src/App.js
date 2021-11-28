import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";


// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { setCurrentUser } from "./redux/user/user.actions";
import { setCurrentSetting } from "./redux/setting/setting.actions";
import { setCurrentRoute } from "./redux/routing/routing.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCurrentRoute } from "./redux/routing/routing.selectors";
import Auth from "./backend/Auth";
import System from "./backend/System";


// React Components
import DashboardPage from "./pages/general/dashboard.page";
import AppContainerComponent from "./components/layouts/app-layout.component";
import SignInComponent from "./components/authentication/sign-in.component";
import SettingsPage from "./pages/general/settings.page";

// Stylesheet
import './App.css';

class App extends React.Component{

    constructor() {
        super();
        this.ShowUp = withReactContent(Swal)
    }
    componentDidMount () {
       // Check User Authentication status
        Auth.isUserLoggedIn().then(async response => {
            this.props.setCurrentUser(response.data);
            //Fetch Current system settings
            await this.fetchSystemSettings();
        }).catch(error => {
            console.log(error.response);
        });
    }

    fetchSystemSettings = async () => {
        await System.fetchCurrentSettings().then(res => {
            const { settings } = res.data.data;
            //Update the redux state
            this.props.setCurrentSetting(settings);
        }).catch(err => {
            console.log(err.response);
        });
    }



    render() {
        const { currentUser } = this.props;

        return (
            <div>
                <AppContainerComponent>
                <Switch>
                    <Route exact path='/' render={() => !currentUser ? (<Redirect to='/sign-in' />) : (<DashboardPage />) } />
                    <Route exact path='/settings' render={() => !currentUser ? (<Redirect to='/sign-in' />) : (<SettingsPage />) } />
                    <Route exact path='/sign-in' render={() => currentUser ? (<Redirect to='/' />) : (<SignInComponent />) }/>
                </Switch>
                </AppContainerComponent>
            </div>
        );
    }

}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentRoute: selectCurrentRoute
});

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    setCurrentSetting: setting => dispatch(setCurrentSetting(setting)),
    setCurrentRoute: route => dispatch(setCurrentRoute(route))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
