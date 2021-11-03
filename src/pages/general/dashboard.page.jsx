import React from 'react';
import AppContainerComponent from "../../components/layouts/app-container.component";

 class DashboardPage extends React.Component{
     constructor(props) {
         super(props);

     }

    render() {
        return (
            <AppContainerComponent>
                <div>
                    <h1>Jane Dashboard Reloaded</h1>
                </div>
            </AppContainerComponent>
        );
    }
 }

 export default DashboardPage;