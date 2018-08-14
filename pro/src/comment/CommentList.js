import React,{Component} from 'react';
import Comment from "./Comment";

class CommentList extends Component{
    render(){
        let commentNodes = this.props.data.map((comment,index) => {
           return (
               <Comment author={comment.author} date={comment.date} key={index}>{comment.text}</Comment>
           ); 
        });
        return(
            <div>
                {commentNodes}
            </div>
        );
    }
}

export default CommentList;