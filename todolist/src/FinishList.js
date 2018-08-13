import React, { Component, Fragment } from "react";

class FinishList extends Component{
    constructor(props) {
        super(props);//用于初始化
    }
    

    render(){
        return(
            <Fragment>
                <li>{this.props.content}</li>
            </Fragment>
        )
    }
}

export default FinishList;