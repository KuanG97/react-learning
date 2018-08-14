import React, { Component } from 'react';
import {Button} from 'antd';

class CommentForm extends Component {
    handleSubmit(event){
        event.preventDefault();//可去掉事件默认要做的事
        console.log("提交表单");

        let author = this.refs.author.value,
            text = this.refs.text.value;

        console.log(author+text);

        this.props.onCommentSubmit({author,text,date:"刚刚"});//获得从父组件传来的方法并通过对象将值传回给父组件
    }

    render() {
        return (
            <form>
                <div className="field">
                    <input type="text" placeholder="姓名" ref="author" />
                </div>
                <div className="field">
                    <textarea placeholder="评论" ref="text" ></textarea>
                </div>
                <Button type="primary" icon="edit" onClick={this.handleSubmit.bind(this)}>
                    添加评论
                </Button>
            </form>
        );
    }
}

export default CommentForm;