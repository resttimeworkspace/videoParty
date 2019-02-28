import React, { Component } from "react";
import { Button } from "antd";
import Header from "../../components/Header";
import request from "../../utils";
import "./index.less";
const defaultPic = require("../../assets/default_new.png");

class Confirm extends Component {
  state = {
    user:{}
  }
  componentDidMount() {
    let id = sessionStorage.getItem("org");
    let orgName = sessionStorage.getItem("orgName");
    request.get(`/api/org/${id}/${this.props.match.params.uid}`).then(res => {
      this.setState({
        user:res.data
      })
    })
  }
  next = () => {
    let id = sessionStorage.getItem("org");
    let uid = this.props.match.params.uid
    sessionStorage.setItem('user', JSON.stringify(this.state.user))
    if(this.state.user.image){ // 有照片先直接跳转录制
      this.props.history.push(`/${id}/recordDemo/${uid}`);
    }else{
      this.props.history.push(`/${id}/records/${uid}`);
    }
  };
  prev = () => {
    let id = sessionStorage.getItem("org");
    this.props.history.push(`/${id}/recordUserList`);
  };
  render() {
    let user = this.state.user ||  JSON.parse(sessionStorage.getItem("user"))
    let orgName = sessionStorage.getItem("orgName");
    let id = sessionStorage.getItem("org");
    
    return (
      <div className="confirm">
        <div className="detail">
          <Header back={`/${id}/recordUserList`} title="党员信息" type="red" />
          <div className="confirm_body">
            <img src={user.image || defaultPic} alt="" />
            <div className="first">
              <p>姓名：{user.name}</p>
              <p>性别：{user.sex === undefined ? '' : user.sex ?  '男':'女'}</p>
            </div>
            <p>党支部：{orgName}</p>
            <p>入党时间：{user.in_time}</p>
            <div className="first">
              <Button type="primary" onClick={this.next}>
                确认
              </Button>
              <Button type="primary" onClick={this.prev}>
                返回
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
