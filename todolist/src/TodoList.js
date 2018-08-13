import React, { Component ,Fragment } from 'react';
import TodoItem from './TodoItem';
import FinishList from './FinishList';

//定义一个React组件
class TodoList extends Component {
  //构造函数
  constructor(props){
    super(props);//用于初始化
    this.state = {//用于存数据内容
      list:[],
      inputValue:'',
      num: 0,
      finishList: []
    }

    //用于下方调用，可提升代码的执行性能！
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  // onclick函数
  handleBtnClick(){
    // this.state.list.push('Hello world');//无法刷新
    this.setState({
      list:[...this.state.list,this.state.inputValue],
      inputValue:''//用于每次添加完后清空input
    })
  }

  handleInputClick(e){
    this.setState({
      inputValue:e.target.value
    })
  }

  //获取列表前的(索引)，并删除
  handleDelete(index, content){
    const list = [...this.state.list];//拷贝list(直接改state的内容也可以，但是并不建议这样，避免实操误操作)
    const finishList = [...this.state.finishList];
    finishList.push(content);
    list.splice(index,1);//删除对应索引的一个内容
    this.setState({
      list:list,
      finishList: finishList,
      num: this.state.num+1
    })
    console.log("/n删除的内容"+content);//测试从子组件获取的content
    console.log("完成的Num："+this.state.num);//测试从子组件获取的content
    console.log(this.state.finishList);
  }

  //优化return为一个函数调用
  getTodoItem(){
    return(
      // 循环list的数据放在一个标签内
      this.state.list.map((item,index) => {
        // return <li key={index} onClick={this.handleItemClick.bind(this,index)}>{item}</li>
        return(
          <TodoItem
              delete1={this.handleDelete}
              key={index}
              content={item}
              index={index}/>//用属性传值
        );
      })
    )
  }

  getFinishListm() {
    return (
      this.state.finishList.map((item, index) => {
        return (
          <FinishList
            key={index}
            content={item} />//用属性传值
        );
      })
    )
  }

  //组件必须含有render函数，负责页面要显示的内容
  render() {
    //JSX语法，使用可以在reactJs中写出html
    return (
      // 注意只能返回一个jsx(理解大容器只能有一个)
      //this.handleBtnClick改+。bind(this),保证执行该函数的this指向的不是button而是组件，方可调用this.state
      <Fragment>
          <input value={this.state.inputValue} onChange={this.handleInputClick} className="intput"/>
          <button onClick={this.handleBtnClick} className="btnAdd">add</button>
          {this.getTodoItem()}
          <h4>已完成项<span className="tabNum">{this.state.num}</span></h4>
        {this.getFinishListm()}
      </Fragment>
    );
  }
}

// 导出一个组件
export default TodoList;
