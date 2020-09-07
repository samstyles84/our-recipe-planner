import React, { Component } from "react";
import * as api from "../utils/api";
import { StyledLogin } from "../styling/styledGlobal";

class LoginForm extends Component {
  state = {
    username: null,
    loggedIn: false,
    err: null,
  };

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();
    api
      .fetchUser(this.state.username)
      .then((res) => {
        if (res.status === 200) {
          this.props.loginUser(this.state.username);
          this.setState((currentState) => {
            return {
              loggedIn: true,
              err: null,
            };
          });
        }
      })
      .catch(({ response }) => {
        this.setState({
          err: { msg: response.data.msg, status: response.status },
        });
      });
  };

  handleChange = (changeEvent) => {
    const value = changeEvent.target.value;
    const id = changeEvent.target.id;
    this.setState(() => {
      return { [id]: value };
    });
  };

  render() {
    return (
      <StyledLogin>
        {this.state.loggedIn ? (
          <section>
            Logged in as {this.state.username}
            <button
              onClick={() => {
                this.props.loginUser(null);
                this.setState({
                  username: null,
                  loggedIn: false,
                });
              }}
            >
              Logout
            </button>
          </section>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="username">Enter Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={this.handleChange}
            />
            <button>Login</button>
            {this.state.err && <p>User not found</p>}
          </form>
        )}
      </StyledLogin>
    );
  }
}

export default LoginForm;
