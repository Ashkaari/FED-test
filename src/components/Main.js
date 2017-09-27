import React, { Component } from 'react'
import Home from './Home';
import Flex from './Flex';
import Chat from './Chat/Chat';
import { Switch, Route } from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/flex' component={Flex}/>
                <Route path='/chat' component={Chat}/>
            </Switch>
        )
    }
}