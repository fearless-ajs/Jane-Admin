import React from 'react';
import { withRouter } from 'react-router-dom';
import SideBar from "./side-bar.component";
import NavBar from "./nav-bar.component";
import Footer from "./footer.component";
import './../../assets/css/all.min.css';
import './../../assets/css/adminlte.css';
import './../../assets/css/OverlayScrollbars.min.css';


class AppContainerComponent extends React.Component{
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className=''>
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
                    <div className="content-wrapper">
                        {/*Insert the children here*/}
                        {this.props.children}
                    </div>

                    {/*Control Sidebar */}
                    <aside className="control-sidebar control-sidebar-dark">
                      {/*Control sidebar content goes here */}
                      <button className='btn btn-primary' onClick={() => this.props.history.push(`/sign-in`)}>Sign out</button>
                    </aside>
                    {/* End Control Sidebar */}

                    {/*Footer Section*/}
                    <Footer />
                </div>
            </div>
        );
    }
}

export default withRouter(AppContainerComponent);