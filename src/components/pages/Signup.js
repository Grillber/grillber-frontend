import React, {Component} from 'react';
import {Icon, Col, Row, Input, Button} from 'react-materialize';
import './Signup.css';

const ENTER = 13;

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      currentInput: ""
    };
  }

  _handlePhoneInput = (event) => {
    let value = event.target.value;

    value = value.replace(/\D/g, '');
    value = value.substring(0, 14);

    if (value.length === 0) {
      this.setState({currentInput: value})
    } else if (value.length < 4) {
      value = '(' + value;
      this.setState({currentInput: value})
    } else if (value.length < 7) {
      value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6);
      console.log(value)
      this.setState({currentInput: value})
    } else {
      value = '(' + value.substring(0, 3) + ') ' + value.substring(3, 6) + ' - ' + value.substring(6, 10);
      this.setState({currentInput: value})
    }
  }

  _handleSignUp = () => {

    let {error} = this.state;

    let {
      firstname: {value: firstname},
      lastname: {value: lastname},
      phone: {value: phone},
      email: {value: email},
      password: {value: password},
      confirmpassword: {value: confirmpassword}
    } = this.refs;

    if (firstname && lastname && phone && email) {
      if (password === confirmpassword) {
        // auth.signup(email, password)
        // .then(res => this.props.router.push('/login'))
        // .catch(console.error);
      } else {
        this.setState ({
          error: "your passwords do not match"
        })
      }
    } else {
      this.setState({ error: "Please complete all the fields"});
    }
  }

  _handleEnter = (e) => {
    if (this.state && this.state.error) {
      this.setState({ error: null });
    }
    if (e.keyCode===ENTER) {
      this._handleSignUp();
    }
  }

  render() {

    let {currentInput, error} = this.state;

    return (
      <div className="signup-background">
        <div className="signup-header">
          <p>Sign up to experience the convenience of grilling anywhere</p>
        </div>
        <div className="signup-form">
          <Row>
            <Input s={6} label="First Name" ref="firstname" />
            <Input s={6} label="Last Name" ref="lastname" />
            <Input s={12} label="Phone" onInput={this._handlePhoneInput} value={currentInput} ref="phone"/>
            <Input s={12} type="email" label="Email" ref="email" />
            <Input s={12} type="password" label="password" ref="password" />
            <Input s={12} type="password" label="confirm password" ref="confirmpassword" onKeyUp={this._handleEnter}/>
          </Row>
        </div>
        <div className="next-section">
          <Button onClick={this._handleSignUp}>Sign up</Button>
          <span className="error">{error}</span>
        </div>
      </div>
    );
  }
}
