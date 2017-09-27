import React, { Component } from 'react';

export default class Flex extends Component {
    constructor (props) {
        super(props);
        this.state = {
            email: '',
            emailValid: true,
            formErrors: {email: ''}
        }
    }

    handleUserInput(e) {
        const value = e.target.value;
        const name = e.target.name;
        this.setState({[name]: value},
            () => { this.validateField(value) });
    }

    validateField(value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = value.match(/^([\w.%+-]+)(@([\w-]+\.)+([\w]{2,}))$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Email is invalid';
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
        });
    }

    render() {
        let displayName = this.state.emailValid ? this.state.emailValid[1] : '';
        let displayDomain = this.state.emailValid ? this.state.emailValid[2] : '';

        return(
            <div className="row content">
                <form className="form">
                    <div className="inputField">
                        <label htmlFor="email" className="flex1">Field A</label>
                        <input type="email" required className="form-control flex2" name="email"
                               placeholder="Email"
                               value={this.state.email}
                               onChange={this.handleUserInput.bind(this)}  />
                        <span className="errorEmail">{this.state.formErrors.email}</span>

                    </div>
                    <div className="inputField">
                        <label htmlFor="dup" className="flex1">Field B</label>
                        <input className="form-control flex2" name="dup" value={displayName} placeholder="Here will be result"/>
                        <span className="domen">{displayDomain}</span>
                    </div>
                </form>

            </div>
        )
    }
}