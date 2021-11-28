import React from "react";
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";
import { Link } from 'react-router-dom';

// SweetAlert
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { setCurrentSetting } from "../../redux/setting/setting.actions";
import { setCurrentRoute } from "../../redux/routing/routing.actions";
import { selectCurrentSetting } from "../../redux/setting/setting.selectors";

import FormInput from "../../components/form-elements/form-input.component";
import FormButton from "../../components/form-elements/form-buttom.component";
import ButtonSpinner from "../../components/spinners/button-spinner.component";
import Settings from "../../backend/System";
import {selectCurrentUser} from "../../redux/user/user.selectors";
import Progress from "../../components/form-elements/progress-bar.component";
import axios from "axios";



class SettingsPage extends React.Component{
    constructor(props) {
        super(props);

        const setting  = this.props.currentSetting;
        this.state = {
            errorCode: false,
            loading: false,
            uploadPercentage: 0,
            name: setting.name,
            domain: setting.domain,
            email: setting.email,
            phone: setting.phone,
            notificationEmail: setting.notificationEmail,
            notificationEmailPassword: setting.notificationEmailPassword,
            facebookPageLink: setting.facebookPageLink,
            twitterPageLink: setting.twitterPageLink,
            instagramPageLink: setting.instagramPageLink,
            address: setting.address,
            location: setting.location,
            city: setting.city,
            state: setting.state,
            country: setting.country,
            postcode: setting.postcode,
            favicon: setting.favicon,
            icon: setting.icon,

            currentFavicon: '',
            currentIcon:''
        }

        this.Swal = withReactContent(Swal)
    }

    componentDidMount() {
        //Sets Current route
        this.props.setCurrentRoute('/settings');
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    handleFileChange = (event) => {
        const { files, name } = event.target;
        this.setState({ [name]: files[0] });
        // this.setState({favicon: e.target.files[0]})
        // this.setState({icon: e.target.files[0]})
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        await this.setState({ loading: true });

        // Create the formData
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('domain', this.state.domain);
        formData.append('email', this.state.email);
        formData.append('phone', this.state.phone);
        formData.append('notificationEmail', this.state.notificationEmail);
        formData.append('notificationEmailPassword', this.state.notificationEmailPassword);
        formData.append('facebookPageLink', this.state.facebookPageLink);
        formData.append('twitterPageLink', this.state.twitterPageLink);
        formData.append('instagramPageLink', this.state.instagramPageLink);
        formData.append('address', this.state.address);
        formData.append('location', this.state.location);
        formData.append('city', this.state.city);
        formData.append('state', this.state.state);
        formData.append('country', this.state.country);
        formData.append('postcode', this.state.postcode);

        formData.append('icon', this.state.icon);
        formData.append('favicon', this.state.favicon);

        await Settings.updateSettings(formData).then(response => {
            const { settings } = response.data.data;

            this.props.setCurrentSetting(settings);
            this.Swal.fire({
                icon: 'success',
                title: 'System Information Updated',
                timerProgressBar: true,
                showConfirmButton: true,
                timer: 10000
            });
            this.setState({ loading: false });
            this.setState({ errorCode: false });
        }).catch(error => {
            const { err, message } = error.response.data
            // console.log({err, message});
            console.log(error.response.data);
            this.Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                timerProgressBar: true,
                showConfirmButton: true,
                text: message,
                timer: 100000
            });
            this.setState({ loading: false });
            this.setState({ errorCode: err.statusCode });
        });


    }

    render() {
        const { currentSetting } = this.props
        return (
            <div>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>System settings </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                                    <li className="breadcrumb-item active">Settings</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="content">
                    <div className="container-fluid">

                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Update system information</h3>

                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus"></i>
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="card-body">

                                <form onSubmit={this.handleSubmit} >

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>App Name</label>
                                                <FormInput
                                                    placeholder="App name"
                                                    type="text"
                                                    name='name'
                                                    handleChange={this.handleChange}
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.name}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Domain</label>
                                                <FormInput
                                                    placeholder="Domain name"
                                                    handleChange={this.handleChange}
                                                    name='domain'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.domain}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Notification Email</label>
                                                <FormInput
                                                    placeholder="Notification Email"
                                                    name='notificationEmail'
                                                    handleChange={this.handleChange}
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.notificationEmail}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Notification Email Password</label>
                                                <FormInput
                                                    placeholder="Notification Email Password"
                                                    handleChange={this.handleChange}
                                                    name='notificationEmailPassword'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.notificationEmailPassword}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Facebook Link</label>
                                                <FormInput
                                                    placeholder="Facebook Page"
                                                    handleChange={this.handleChange}
                                                    name='facebookPageLink'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.facebookPageLink}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>City</label>
                                                <FormInput
                                                    placeholder="City"
                                                    handleChange={this.handleChange}
                                                    name='city'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.city}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>State</label>
                                                <FormInput
                                                    placeholder="State"
                                                    handleChange={this.handleChange}
                                                    name='state'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.state}
                                                />
                                            </div>



                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label>Email</label>
                                                <FormInput
                                                    placeholder="Email"
                                                    handleChange={this.handleChange}
                                                    name='email'
                                                    type="email"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.email}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Phone</label>
                                                <FormInput
                                                    placeholder="Phone number"
                                                    handleChange={this.handleChange}
                                                    name='phone'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.phone}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Twitter Page</label>
                                                <FormInput
                                                    placeholder="Twitter Page"
                                                    handleChange={this.handleChange}
                                                    name='twitterPageLink'
                                                    type="text"
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.twitterPageLink}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Instagram Page</label>
                                                <FormInput
                                                    placeholder="Instagram Page"
                                                    handleChange={this.handleChange}
                                                    type="text"
                                                    name='instagramPageLink'
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.instagramPageLink}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Address</label>
                                                <FormInput
                                                    placeholder="Address"
                                                    handleChange={this.handleChange}
                                                    type="text"
                                                    name='address'
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.address}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Country</label>
                                                <FormInput
                                                    placeholder="Country"
                                                    handleChange={this.handleChange}
                                                    type="text"
                                                    name='country'
                                                    className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.country}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label>Post Code</label>
                                                <FormInput
                                                    placeholder="Post Code"
                                                    handleChange={this.handleChange}
                                                    type="text"
                                                    name='postcode'
                                                    className={'form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                                    value={this.state.postcode}
                                                />
                                            </div>

                                        </div>

                                    </div>



                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Favicon <sup>(Max 200kb)</sup></label>
                                            <img src={`${Settings.serverLink()}/uploads/images/system/${currentSetting.favicon}`} style={{
                                                width: '2%',
                                                marginLeft: '10px'
                                            }}/>
                                            <FormInput
                                                type="file"
                                                name='favicon'
                                                handleChange={this.handleFileChange}
                                                className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Icon <sup>(Max 200kb)</sup></label>
                                        <img src={`${Settings.serverLink()}/uploads/images/system/${currentSetting.icon}`} style={{
                                            width: '2%',
                                            marginLeft: '10px'
                                        }}/>
                                        <FormInput
                                            type="file"
                                            name='icon'
                                            handleChange={this.handleFileChange}
                                            className={' form-control ' + ((this.state.errorCode)? 'is-invalid' : '')}
                                        />
                                    </div>

                                    <FormButton type="submit" disabled={this.state.loading} category='primary' >
                                        { this.state.loading ? (<ButtonSpinner />): 'Save settings' }
                                    </FormButton>
                                </form>

                            </div>

                            <div className="card-footer">
                                Contact <a href="#">the system administrator if </a> you're not sure of what to do.
                            </div>


                        </div>

                    </div>
                </section>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentSetting: setting => dispatch(setCurrentSetting(setting)),
    setCurrentRoute: route => dispatch(setCurrentRoute(route))
});

const mapStateToProps = createStructuredSelector({
    currentSetting: selectCurrentSetting
});
export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);