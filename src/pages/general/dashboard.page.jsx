import React from 'react';
import { connect } from "react-redux";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { setCurrentRoute } from "../../redux/routing/routing.actions";
import { selectCurrentRoute } from "../../redux/routing/routing.selectors";
import {createStructuredSelector} from "reselect";



class DashboardPage extends React.Component{
    constructor() {
        super();

        this.state = {
            redirect: false
        }
        this.Swal = withReactContent(Swal);
    }

    componentDidMount() {
        if (this.props.currentRoute){
            // Ask if user wants to resume to previous route
            this.Swal.fire({
                title: 'Welcome back!',
                text: "Do you want to resume where you left?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, resume!',
                cancelButtonText: 'No, stay here!'
            }).then((result) => {
                if (result.isConfirmed) {
                   this.setState({ redirect: true });
                }
            });
        }
        //Sets Current route
        // this.props.setCurrentRoute('/');
    }

     render() {
        // Checks if redirect is true
         if (this.state.redirect) return <Redirect to={this.props.currentRoute}/>
        return (
                <div>
                    <h1>Jane Dashboard Reloaded</h1>
                </div>
        );
    }
 }

//For setting values on the state with redux
const mapDispatchToProps = dispatch => ({
    setCurrentRoute: route => dispatch(setCurrentRoute(route))
});

const mapStateToProps = createStructuredSelector({
    currentRoute: selectCurrentRoute
});

 export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);