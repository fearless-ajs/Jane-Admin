import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { setCurrentUser } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentSetting } from "../../redux/setting/setting.selectors";

import SideBar from "./side-bar.component";
import NavBar from "./nav-bar.component";
import Footer from "./footer.component";
import ButtonSpinner from "../spinners/button-spinner.component";

import './../../assets/css/all.min.css';
import './../../assets/css/adminlte.css';
import './../../assets/css/OverlayScrollbars.min.css';

import Auth from "../../backend/Auth";

class AppLayoutComponent extends React.Component{
    constructor() {
        super();

        this.state = {
            loading: false,
        }
        this.ShowUp = withReactContent(Swal)
    }

    logout = async () => {
        this.setState({ loading: true });
        await Auth.logout().then(response => {
            this.props.setCurrentUser(null);
            this.ShowUp.fire({
                icon: 'success',
                title: 'Logged Out Successfully',
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 1000
            });
            this.setState({ loading: false });
        }).catch(error => {
            this.setState({ loading: false });
            alert(error)
        });
    }

    render() {
        return (
            <div >
                <div className="wrapper">

                    {/*<div className="preloader flex-column justify-content-center align-items-center">*/}
                    {/*    <img className="animation__wobble" src="/dist/img/AdminLTELogo.png" alt="AdminLTELogo"*/}
                    {/*         height="60" width="60" />*/}
                    {/*</div>*/}

                    {/*Panel Top Navigation bar*/}
                    <NavBar />

                    {/*Panel Side bar*/}
                    <SideBar />

                    {/*Content Wrapper. Contains page content*/}
                    <div className={(this.props.currentUser)? 'content-wrapper': ''}>
                        {/*Insert the children here*/}
                        {this.props.children}
                    </div>

                    {/*Control Sidebar */}
                    <aside className="control-sidebar control-sidebar-dark">
                      {/*Control sidebar content goes here */}
                      <button className='btn btn-primary' onClick={() => this.logout()}>
                          { this.state.loading ? (<ButtonSpinner />): 'Sign Out' }
                      </button>
                    </aside>
                    {/* End Control Sidebar */}

                    {/*Footer Section*/}
                    <Footer />
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});
const mapStateToProps = createStructuredSelector ({
      currentUser: selectCurrentUser,
      currentSetting: selectCurrentSetting
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppLayoutComponent));