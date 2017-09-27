import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class MenuItem extends Component {

    render() {
        const { source } = this.props;
        return(

            <Link to={`/${source.url}`} className="btn menuItem" key={source.id}>{source.title}</Link>

        )
    }
}