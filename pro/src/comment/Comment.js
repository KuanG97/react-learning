import React, { Component } from 'react';
import {Divider} from 'antd';

class Comment extends Component {
    render() {
        return (
            <div className="comment">
                <Divider orientation="left">
                    <h3>{this.props.author}<span className="date">
                        {this.props.date}
                    </span></h3>
                </Divider>
                <div className="content">
                    <div className="text">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default Comment;