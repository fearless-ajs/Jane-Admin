import React from 'react';
import { Link } from "react-router-dom";
import FormInput from "../form-elements/form-input.component";
import FormButton from "../form-elements/form-buttom.component";

class SignInComponent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({email: '', password: ''});
    }

    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className='hold-transition login-page'>
                <div className="login-box">
                    <div className="card card-outline card-primary">
                        <div className="card-header text-center">
                            <Link className='h1' to='/'>
                                <b>Jane</b>LTE
                            </Link>
                        </div>
                        <div className="card-body">
                            <p className="login-box-msg">Sign in to start your session</p>

                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group mb-3">
                                    <FormInput type="email" name='email' value={this.state.email} handleChange={this.handleChange} placeholder="Email"  />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-envelope"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <FormInput type="password" name='password' value={this.state.password}  handleChange={this.handleChange} placeholder="Password"  />
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <span className="fas fa-lock"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary">
                                            <FormInput type="checkbox" id="remember"  />
                                            <label htmlFor="remember">
                                                Remember Me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <FormButton type="submit" category='primary' >
                                            Sign In
                                        </FormButton>
                                    </div>
                                </div>
                            </form>

                            <div className="social-auth-links text-center mt-2 mb-3">
                                <Link to='#' className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                                </Link>
                                <Link to='#' className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                                </Link>
                            </div>

                            <p className="mb-1">
                                <Link to='#'>
                                    <a href="forgot-password.html">I forgot my password</a>
                                </Link>
                            </p>
                            <p className="mb-0">
                                <Link to='#'>
                                    <a href="register.html" className="text-center">Register a new membership</a>
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default SignInComponent;