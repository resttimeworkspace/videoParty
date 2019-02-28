import React, { Component } from "react";
import { Button, Pagination } from "antd";
import Header from "../../components/Header";
import VideoModal from "../../components/VideoModal";
import request from "../../utils";
import "./index.less";
const default_avatar = require("../../assets/default_user.png");
class Users extends Component {
  state = {
    list: [],
    pagination: {
      current_page: 1,
      pageSize: 6,
      total: 0
    },
    showVideo: false,
    videoUrl: ""
  };
  componentDidMount() {
    request
      .get(`/api/org/${this.props.match.params.id}/xuanshi/list`)
      .then(res => {
        this.setState({
          list: res.data.data,
          pagination: {
            current_page: res.data.data.current_page,
            pageSize: 6,
            total: res.data.data.total
          }
        });
      });
  }
  openVideo = videoUrl => () => {
    this.setState({
      showVideo: true,
      videoUrl
    });
  };
  closeVideo = () =>{
    this.setState({
      showVideo: false,
      videoUrl:''
    });
  }
  render() {
    const { list, pagination, showVideo, videoUrl } = this.state;
    const orgName = sessionStorage.getItem("orgName");
    return (
      <div className="users">
        <Header title="重温誓词" back="/" />
        <div className="users_body">
          {list.map((e, i) => (
            <div className="users_item" key={i}>
              <img
                width="100%"
                height="210px"
                src={e.image || default_avatar}
                alt=""
              />
              <div className="users_item_content">
                <div>
                  <h3>姓名：{e.name}</h3>
                  <p>党支部：{orgName}</p>
                </div>
                <Button type="primary" onClick={this.openVideo(e.video)}>
                  播放
                </Button>
              </div>
            </div>
          ))}
          <div className="pagination" style={{ width: "1075px" }}>
            <Pagination {...pagination} />
          </div>
          <VideoModal show={showVideo} close={this.closeVideo} videoUrl={videoUrl} />
        </div>
      </div>
    );
  }
}

export default Users;
