import React, { Component } from 'react';
import Message from './Message';

export default class Messages extends Component {
    render() {
        const messages = this.props.messages.map((message, i) => {
            return (
                <Message
                    key={i}
                    message={message.message}
                    time={message.curr_time}
                    type={message.type}
                />

            );
        });

        return (
            <div className='messages' id='messageList'>
                { messages }
            </div>
        )
    }
}