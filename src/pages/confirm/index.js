import React, { Component } from "react";
import { Button } from "antd";
import Header from "../../components/Header";
import request from "../../utils";
import "./index.less";
const defaultPic = require("../../assets/default_new.png");

class Confirm extends Component {
  state = {
    user: {}
  };
  componentDidMount() {
    let id = sessionStorage.getItem("org");
    let orgName = sessionStorage.getItem("orgName");
    let type = +this.props.match.params.type;

    const url = `/api/org/${id}/${(type ? '': 'team/') +this.props.match.params.uid}`
    request.get(url).then(res => {
      this.setState({
        user: res.data
      });
    });
  }
  next = () => {
    let id = sessionStorage.getItem("org");
    let uid = this.props.match.params.uid;
    const type = +this.props.match.params.type;
    sessionStorage.setItem("user", JSON.stringify(this.state.user));

    console.log(this.state.user);
    if (this.state.user.image) {
      // 有照片先直接跳转录制
      this.props.history.push(`/${id}/recordDemo/${uid}/${type}`);
    } else {
      this.props.history.push(`/${id}/records/${uid}/${type}`);
    }
  };
  prev = () => {
    let id = sessionStorage.getItem("org");
    let type = this.props.match.params.type;
    this.props.history.push(`/${id}/initialHeart/recordList/${type}`);
  };
  render() {
    let user = this.state.user || JSON.parse(sessionStorage.getItem("user"));
    let orgName = sessionStorage.getItem("orgName");
    let id = sessionStorage.getItem("org");
    let type = this.props.match.params.type;

    const typeName = +type ? "党员信息" : "党组织信息";
    return (
      <div className="confirm">
        <div className="detail">
          <Header
            back={`/${id}/initialHeart/recordList/${type}`}
            title={typeName}
            type="red"
          />
          <div className="confirm_body">
            <img src={user.image || defaultPic} alt="" />
            {+type ? (
              <>
                <div className="first">
                  <p>姓名：{user.name}</p>
                  <p>
                    性别：{user.sex === undefined ? "" : user.sex ? "男" : "女"}
                  </p>
                </div>
                <p>党支部：{orgName}</p>
                <p>入党时间：{user.in_time}</p>
              </>
            ) : (
              <dl className="org-welcome">
                <dt>热烈欢迎</dt>
                <dd>{user.name}</dd>
                <dd>各位领导</dd>
              </dl>
            )}
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
