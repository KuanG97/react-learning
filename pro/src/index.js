import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './comment/CommentBox';
import {Router,Route,Link} from 'react-router';
import './App.css';

ReactDOM.render(<CommentBox url="./comments.json" className="CommentBox" />, document.getElementById('root'));