import React, { Component } from 'react';

export default class ChatInput extends Component {
    constructor(){
        super();

        this.state={
            chatInput: '',
            isHovering: false
        };

        this.submitHandler      = this.submitHandler.bind(this);
        this.textChangeHandler  = this.textChangeHandler.bind(this);
        this.handleKeyPress     = this.handleKeyPress.bind(this);
    }

    textChangeHandler(event)  {
        this.setState({ chatInput: event.target.value });
    }

    submitHandler(event) {
        event.preventDefault();
        this.setState({chatInput: ''});
        this.props.onSend(this.state.chatInput, true);
    }

    //TODO: do smth about text deleting on pressing enter when selected ctrl+enter and vice versa
    //W/o setting state to empty string out input's text will remain and that's worse than deleting it imo
    handleKeyPress(event) {
        if(event.nativeEvent.keyCode === 13) {
            if(event.nativeEvent.ctrlKey) {
                this.props.onSend(this.state.chatInput, false, 'ctrlenter');
                this.setState({chatInput: ''});
            } else {
                this.props.onSend(this.state.chatInput, false, 'enter');
                this.setState({chatInput: ''});
            }
        }
    }

    render() {
        return(
            <div className="chat-input">
                <input type="text"
                       onChange={this.textChangeHandler}
                       value={this.state.chatInput}
                       placeholder="Write a message..."
                       required
                       className="flex1"
                       onKeyUp={this.handleKeyPress}/>
                <button
                    onClick={this.submitHandler}
                    className="btn" role="button">Send</button>

            </div>
        )
    }
}