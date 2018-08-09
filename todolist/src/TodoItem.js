import React from 'react';

class TodoItem extends React.Component{

  //构造函数
  constructor(props){
    super(props);//用于初始化

    //用于下方调用，可提升代码的执行性能！
    this.handleDelete = this.handleDelete.bind(this);
  }

	//子组件向父组件传值，告诉父组件删除index对应item
	handleDelete(){
		// this.props.delete1(this.props.index);
		//优化以上代码
		const {delete1,index}=this.props;
		delete1(index);
	}

	render(){
		return(
			//通过this.props获取传值
			<div onClick={this.handleDelete} className="list">{this.props.index+1}.{this.props.content}</div>
		)
	}
}
export default TodoItem;