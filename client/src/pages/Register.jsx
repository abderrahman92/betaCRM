import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";


import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vrole = value => {
  if (isNaN(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid role.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      roles:[],
      successful: false,
      message: ""
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeRole(e) {
    console.log(this.state.roles);
      this.setState({ roles: [...this.state.roles, e.target.value] })
  }


  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.roles,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
          
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
         

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
 
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>          
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-check container">
                  <div className="row">
                  <label className="form-check-label" htmlFor="role">cemeca</label>
                  <Input 
                    type="checkbox"
                    className="form-check"
                    name="cemeca"
                    value="1"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  />
                  <label className="form-check-label" htmlFor="role">sofitech</label>
                    <Input
                    type="checkbox"
                    className="form-check"
                    name="sofitech"
                    value="2"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  />
                  <label className="form-check-label" htmlFor="role">admin cemeca</label>
                    <Input
                    type="checkbox"
                    className="form-check"
                    name="admin_cemeca"
                    value="3"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  />
                  <label className="form-check-label" htmlFor="role">admin sofitech</label>
                    <Input
                    type="checkbox"
                    className="form-check"
                    name="admin_sofitech"
                    value="4"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  />
                  </div>
                     <label className="form-check-label" htmlFor="role">super_cemeca</label>
                    <Input
                    type="checkbox"
                    className="form-check"
                    name="super_cemeca"
                    value="5"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  />
                     <label className="form-check-label" htmlFor="role">super_sofitech</label>
                    <Input
                    type="checkbox"
                    className="form-check"
                    name="super_sofitech"
                    value="6"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  />
                    <label className="form-check-label" htmlFor="role">super_admin</label>
                    <Input
                    type="checkbox"
                    className="form-check"
                    name="super_admin1"
                    value="7"
                    onChange={this.onChangeRole}
                    validations={[required, vrole]}
                  /> 
                   <label className="form-check-label" htmlFor="role">super_admin2</label>
                  <Input
                  type="checkbox"
                  className="form-check"
                  name="super_admin2"
                  value="8"
                  onChange={this.onChangeRole}
                  validations={[required, vrole]}
                />
                </div>
    
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Ajouter</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
