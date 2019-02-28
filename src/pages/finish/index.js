import React, { Component } from "react";
import { Button } from "antd";
import Header from "../../components/Header";
import request from "../../utils";
import "./index.less";
const defaultPic = require("../../assets/default_new.png");

class Finish extends Component {
  state = {
    count: 5
  }
  componentDidMount (){
    let timer = setInterval(() => {
      if(this.state.count === 0){
        clearInterval(timer)
        this.props.history.push('/')
      }else {
        this.setState({
          count: this.state.count-1
        })
      }
    },1000)
  }

  render() {
    let count = this.state.count
    return (
      <div className="finish">
        <div className="finish_body">
          <Header showBack={false} title="温馨提示" type="red" />
          <div className="finish_body_content" >
            <img src={require('../../assets/finish_bg.png')} alt=""/>
            <h3>
            您已完成本次信息采集，谢谢您的配合！
            </h3>
            <small>
            还有{count}秒自动返回主界面
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default Finish;
