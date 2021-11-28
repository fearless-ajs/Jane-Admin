import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom';


import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentSetting } from "../../redux/setting/setting.selectors";
import { selectCurrentRoute } from "../../redux/routing/routing.selectors";

import Settings from "../../backend/System";

class SideBar extends React.Component{
    constructor() {
        super();

    }

    render() {
        const user = this.props.currentUser;
        const route = this.props.currentRoute;
        const setting = this.props.currentSetting;
        const { match } = this.props;
        return (
            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                {/*Brand Logo*/}
                <Link to='/' className="brand-link">
                    <img src={`${setting?Settings.systemImagePath(setting.icon):null}`} alt="AdminLTE Logo" className="brand-image img-circle elevation-3"
                         style={{
                             opacity: .8
                         }} />
                    <span className="brand-text font-weight-light">{setting?setting.name:null}</span>
                </Link>

                {/*Sidebar*/}

                    <div className="sidebar">
                        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                {
                                    user? ( <img src={`${Settings.userImagePath(user.data.image)}`} className="img-circle elevation-2" alt="User Image" />
                                    ): ''
                                }
                            </div>
                            <div className="info">

                                {
                                    user? (<a href="#" className="d-block">{user.data.name}</a>): (<a href="#" className="d-block"></a>)
                                }

                            </div>
                        </div>

                        {/*SidebarSearch Form*/}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search"
                                       aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/*Sidebar Menu*/}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                                data-accordion="false">
                                {/*Add icons to the links using the .nav-icon class*/}
                                {/*with font-awesome or any other icon font library*/}
                                <li className="nav-item menu-open">
                                    <a href="#" className={`nav-link ${match.path === '/'? 'active': null}`}>
                                        <i className="nav-icon fas fa-tachometer-alt"></i>
                                        <p>
                                            Dashboard
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to={'/'} className={`nav-link ${route === '/'? 'active': null}`}>
                                                <i className="fa fa-home nav-icon"></i>
                                                <p>Dashboard</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/settings'} className={`nav-link ${route === '/settings'? 'active': null}`}>
                                        <i className="nav-icon fa fa-cogs"></i>
                                        <p>
                                            Settings
                                            <span className="right badge badge-success">update</span>
                                        </p>
                                    </Link>
                                </li>
                                <li className="nav-header">REGISTERED SYSTEM USERS</li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fa fa-users"></i>
                                        <p>
                                            Users
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to='#' className="nav-link">
                                                <i className="fa fa-user-plus nav-icon"></i>
                                                <p>Create</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-users nav-icon"></i>
                                                <p>
                                                    Existing
                                                    <i className="right fas fa-angle-left"></i>
                                                </p>
                                            </a>
                                            <ul className="nav nav-treeview">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <i className="fa fa-user-shield nav-icon"></i>
                                                        <p>Administrators</p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <i className="far fa-dot-circle nav-icon"></i>
                                                        <p>Business</p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <i className="far fa-dot-circle nav-icon"></i>
                                                        <p>Buyers</p>
                                                    </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link">
                                                        <i className="far fa-dot-circle nav-icon"></i>
                                                        <p>Regular</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </nav>
                        {/*sidebar-menu*/}
                    </div>


                {/*sidebar*/}
            </aside>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    currentSetting: selectCurrentSetting,
    currentRoute: selectCurrentRoute
});
export default withRouter(connect(mapStateToProps)(SideBar));