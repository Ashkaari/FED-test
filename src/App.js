import React, { Component } from 'react';
import Menu from "./components/Menu/index";
import Main from "./components/Main";

export default class App extends Component {
    render() {
        return (
            <div className="app">
            <div className="container-fluid rc-intro">
                <div className="container">
                    <h1 className="rc-title">React // Vacancy Test</h1>
                    <Menu />
                </div>
            </div>
            <div className="container">
                <Main/>
            </div>
            </div>
        )
    }
}