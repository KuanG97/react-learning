# 目录

[TOC]

---

# 了解结构

## 最终效果

![这里写图片描述](https://img-blog.csdn.net/20180809154956928?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzM3MTM2NDkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 知识点
了解出口入口，组件。调用数据，函数，构造函数，事件，父子组件。

## 重点难点
1. this的使用
2. 定义组件以及调用，jsx的思想
3. 父子组件之间的通信（传递参数）

## 最初目录结构
index.js入口文件、todoList.js为组件

![这里写图片描述](https://img-blog.csdn.net/20180809124657300?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzM3MTM2NDkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 效果

![这里写图片描述](https://img-blog.csdn.net/20180809130052954?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzM3MTM2NDkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 代码

### index.js部分
```
import React from 'react';
import ReactDOM from 'react-dom';

//TodoList组件,大写字母开头一般为组件(导入)
import TodoList from './TodoList';

//渲染一个DOM节点
ReactDOM.render(<TodoList />, document.getElementById('root'));
```

### todoList.js

```
import React, { Component } from 'react';

//定义一个React组件
class TodoList extends Component {
  //构造函数
  constructor(props){
    super(props);//用于初始化
    this.state = {//用于存数据内容
      list:[
        'learn react',
        'learn antDesign',
        'learn antDesign123'
      ]
    }
  }

  // onclick函数
  handleBtnClick(){
    // this.state.list.push('Hello world');//无法刷新
    this.setState({
      list:[...this.state.list,'hello world']
    })
    alert('click');
  }

  //组件必须含有render函数，负责页面要显示的内容
  render() {
    //JSX语法，使用可以在reactJs中写出html
    return (
      // 注意只能返回一个jsx(理解大容器只能有一个)
      //this.handleBtnClick改+。bind(this),保证执行该函数的this指向的不是button而是组件，方可调用this.state
      <div>
          <input />
          <button onClick={this.handleBtnClick.bind(this)}>add</button>
          <ul>
            {
              // 循环list的数据放在一个标签内
              this.state.list.map((item,index) => {
                return <li key="{index}">{item}</li>
              })
            }
          </ul>
      </div>
    );
  }
}

// 导出一个组件
export default TodoList;

```

---
# 新增列表项之获取input里面的value
## 效果
添加input里的内容到列表，并在添加的同时清空input里的值

## 代码
### 修改todoLiat.js部分

```
 constructor(props){
 
...

+      inputValue:''

...

  handleBtnClick(){
...
-	   list:[...this.state.list,'hello world'],
+      list:[...this.state.list,this.state.inputValue],
+      inputValue:''//用于每次添加完后清空input
...
  }

+  handleInputClick(e){
+    this.setState({
+      inputValue:e.target.value
+    })
+  }
+ 

...

- <input />
+ <input value={this.state.inputValue} onChange={this.handleInputClick.bind(this)}/>
...

```

# 删除列表项

## 效果
点击列表项删除对应项目

## 代码

### 修改todoLiat.js部分
```
...

  //获取列表前的(索引)，并删除
+  handleItemClick(index){
+    const list = [...this.state.list];//拷贝list(直接改state的内容也可以，但是并不建议这样，避免实操误操作)
+    list.splice(index,1);//删除对应索引的一个内容
+    this.setState({
+      list:list
+    })
+  }

...

-				 return <li key={index}>{item}</li>
+                return <li key={index} onClick={this.handleItemClick.bind(this,index)}>{item}</li>

...

```
---

# 拆分组件之——多组件

## 概念
React当中存在着父子组件的概念，打个比方如下例子，todolist就是父组件，todoItem就是子组件。

## 父子组件之间的信息传递
1.父组件通过属性的形式向子组件传递参数，而子组件通过props获取父组件传递过来的参数。
2.父组件获取子组件的传递值（即子组件与父组件的通信），子组件要调用父组件传递过来的方法。EX：父组件创建对应方法并通过属性传递一个方法给子组件，子组件通过props.方法（）获取

## 最终功能效果
![这里写图片描述](https://img-blog.csdn.net/20180809145201183?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzM3MTM2NDkx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

## 代码

### 修改todoLiat.js部分

```
...

  //获取列表前的(索引)，并删除
+  handleDelete(index){
    const list = [...this.state.list];//拷贝list(直接改state的内容也可以，但是并不建议这样，避免实操误操作)
    list.splice(index,1);//删除对应索引的一个内容
    this.setState({
      list:list
    })
+    console.log(index);//测试从子组件获取的index
  }

...

-               return <li key={index} onClick={this.handleItemClick.bind(this,index)}>{item}</li>
+               return <TodoItem delete1={this.handleDelete.bind(this)} key={index} content={item} index={index}/>//用属性传值

...

```

### 细化组件之添加TodoItem.js

```
import React from 'react';

class TodoItem extends React.Component{

	//子组件向父组件传值，告诉父组件删除index对应item
	handleDelete(){
		this.props.delete1(this.props.index);
	}

	render(){
		return(
			//通过this.props获取传值
			<div onClick={this.handleDelete.bind(this)}>{this.props.content}</div>
		)
	}
}
export default TodoItem;
```

---

# 优化代码

## 优化要点
1. 调用优化
举例子：
```
//定义一个React组件
class TodoList extends Component {

...

    //用于下方调用，可提升代码的执行性能！
+    this.handleInputClick = this.handleInputClick.bind(this);
+    this.handleBtnClick = this.handleBtnClick.bind(this);
+    this.handleDelete = this.handleDelete.bind(this);
  }
```
2. return传子组件多行传值优化
3. 拆分return成为一个函数
4. 样式优化
入口文件引入样式
```
import "./xxx.css"
```
最初都是使用style、class、id等，此处要注意跟以往不同格式
```
//以对象的形式写
	style={{backgroung:'red',}}
//class改为className
	className = ‘xxx’
```

5. 最外层div改为React.Fragment
6. react组件的引用继承

```
import React, { Component ,Fragment } from 'react';
//则下方不用再用React.Component 或React.Fragment，直接用Component ，Fragment 
```

---


# 最终代码

[github源码下载 Click Here>>](https://github.com/KuanG97/react-learning/todolist)

---

# 快捷链接

[全部React学习笔记的目录 Click Here>>](https://blog.csdn.net/m0_37136491/article/details/81538637)

[全部Javascript学习笔记的目录 Click Here>>](https://blog.csdn.net/m0_37136491/article/details/80991578)

[github各类源码下载 Click Here>>](https://github.com/KuanG97)

如果你觉得我的东西能帮到你，无限欢迎给我的github库点个收藏Star~0v 0~

---
