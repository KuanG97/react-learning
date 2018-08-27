//引入Component, Fragment，可将下面的简写，无需显示为React.xxx;
// 使用Fragment可避免渲染多了一个多余无用的div;切注意，最大容器有且只有一个
import React, { Component, Fragment} from 'react';
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import $ from 'jquery';


class CommentBox extends Component{
	constructor(props){
	    super(props);
	    this.state = {
	      data:[],
	    };

	    this.getComments();
	    setInterval(() => this.getComments(),5000);//每五秒更新请求
	  }

	getComments(){
	    $.ajax({
	      url:this.props.url,
	      dataType:'json',
	      cache:false,
	      success:comments => {
	        this.setState({
	          data:comments
	        });
	      },
	      error:(xhr,status,error) => {
	        console.log(error);
	      }
	    });
	  }

	handleCommentSubmit(comment){
		let comments = this.state.data,//copy旧数据
			newComments = comments.concat(comment);//旧数据加一条新数据

		this.setState({data:newComments});
	}

	render(){
		//多行渲染
		return(
			<Fragment>
				<div className="comments">
					<h1>评论</h1>
				</div>
				<CommentList data={this.state.data} />
				<CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
			</Fragment>
		);
	}
}

//理解导出CommentBox作为默认的东西
// export { CommentBox as default };
// 可简写成
export default CommentBox;