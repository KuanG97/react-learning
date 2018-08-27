import React, { Component } from 'react';
import {Button,Input } from 'antd';

const { TextArea } = Input;

class CommentForm extends Component {
    handleSubmit(event){
        event.preventDefault();//可去掉事件默认要做的事
        console.log("提交表单");

        let author = this.state.name,
            text = this.state.content;

        console.log(author+text);

        this.props.onCommentSubmit({author,text,date:"刚刚"});//获得从父组件传来的方法并通过对象将值传回给父组件
    }

    getName(event){
        this.setState({
            name:event.target.value,
        });
    }

     getContent(event){
        this.setState({
            content:event.target.value,
        });
    }

    render() {
        return (
            <form>
                <div className="field">
                    <Input type="text" placeholder="姓名" onChange={this.getName.bind(this)} />
                </div>
                <div className="field">
                    <TextArea placeholder="评论"  rows={4} onChange={this.getContent.bind(this)} />
                </div>
                <Button type="primary" icon="edit" onClick={this.handleSubmit.bind(this)}>
                    添加评论
                </Button>
            </form>
        );
    }
}

export default CommentForm;