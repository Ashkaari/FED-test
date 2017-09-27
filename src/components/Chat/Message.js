import React, { Component } from 'react';

export default class Message extends Component {

    render() {
        return(
            <div className={'message ' + this.props.type}>
                <div className="time">{this.props.time}</div>
                <span>{this.props.message}</span>
            </div>
        )
    }



}

