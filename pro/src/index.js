import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './comment/CommentBox';
import './App.css';

ReactDOM.render(<CommentBox url="./comments.json" />, document.getElementById('root'));