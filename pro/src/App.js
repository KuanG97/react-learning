import React, { Component } from 'react';
import CommentBox from './comment/CommentBox';
import $ from 'jquery';

class App extends Component {
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <CommentBox data={this.state.data} />
      </div>
    );
  }
}

export default App;
