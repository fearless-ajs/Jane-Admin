import './App.css';
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from "./pages/authentication/login.page";
import DashboardPage from "./pages/general/dashboard.page";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={DashboardPage} />
                <Route exact path='/sign-in' component={LoginPage} />
            </Switch>
        </div>
    );
}

export default App;
