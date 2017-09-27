import React, { Component } from 'react';
import ChatInput from './ChatInput';
import Messages from './Messages';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        let sendingType = localStorage.getItem('sendingType') ? localStorage.getItem('sendingType') : 'enter';

        this.state = {
            messages: [],
            sendWith: sendingType,
            canSend:  false,
        };

        this.sendHandler                = this.sendHandler.bind(this);
        this.checkSendingMethod         = this.checkSendingMethod.bind(this);
        this.handleRadioClick           = this.handleRadioClick.bind(this);
    }

    formMyMessage(message, time, type) {
        return {
            message:    message,
            curr_time:  time,
            type:       type
        }
    }

    checkSendingMethod(pressed, allow) {
        if(allow) {
            this.setState({
                canSend:true
            });
            return true;
        } else if(this.state.sendWith === pressed) {
            this.setState({
                canSend:true
            });
            return true;
        }
    }

    sendHandler(message, allow, pressed) {

        if(this.checkSendingMethod(pressed, allow)) {
            let date = new Date();
            let curr_time = date.getHours() + ':' + date.getMinutes();

            if(message == '') {
                this.addMessage(this.formMyMessage("Can't send empty message", curr_time, 'system'))
            } else {
                const formed = this.formMyMessage(message, curr_time, 'from_me');

                let request = new XMLHttpRequest();
                let body = JSON.stringify(formed);
                console.log(body);

                request.onreadystatechange = () => {
                    if(request.readyState !== 4 || request.status !== 200) return;

                    let response = JSON.parse(request.responseText);
                    if(response.status === "OK") {
                        curr_time = date.getHours() + ':' + date.getMinutes();
                        this.addMessage(this.formMyMessage('Got your message, brah!', curr_time, 'from_friend'));
                    } else {
                        this.addMessage(this.formMyMessage("Couldn't send your message", curr_time, 'system'));
                    }
                };

                request.open("POST", '/api/send', true);
                request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                request.send(body);

                this.addMessage(formed);

            }
        } else {
            console.log('You shall not pass');
        }

        //TODO: internet connection check

    }

    addMessage(message) {
        const messages = this.state.messages;
        messages.push(message);
        this.setState({ messages });
    }

    handleRadioClick(id) {
        localStorage.setItem('sendingType', id);
        this.setState({
            sendWith: id,
            canSend: false
        });
    }

    render() {
        return (
            <div className="row content">
                <div className="col-12 chatContainer">
                    <div className="chatHeader">
                        <span>Send message on: </span>
                        <label className="custom-control custom-radio">
                            <input id="enter" name="radio" type="radio" className="custom-control-input" onClick={() => this.handleRadioClick('enter')} checked={this.state.sendWith === "enter"}/>
                                <span className="custom-control-indicator"></span>
                                <span className="custom-control-description">Enter</span>
                        </label>
                        <label className="custom-control custom-radio">
                            <input id="ctrlenter" name="radio" type="radio" className="custom-control-input" onClick={() => this.handleRadioClick('ctrlenter')} checked={this.state.sendWith === "ctrlenter"}/>
                                <span className="custom-control-indicator"></span>
                                <span className="custom-control-description">Ctrl+Enter</span>
                        </label>
                    </div>
                    <Messages messages={this.state.messages}/>
                    <ChatInput onSend={this.sendHandler} />
                </div>
            </div>
        )
    }
}