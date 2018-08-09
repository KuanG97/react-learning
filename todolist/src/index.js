import React from 'react';
import ReactDOM from 'react-dom';
import './public.css';

//TodoList组件,大写字母开头一般为组件(导入)
import TodoList from './TodoList';

//渲染一个DOM节点
ReactDOM.render(<TodoList />, document.getElementById('root'));