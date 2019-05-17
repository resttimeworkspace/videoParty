import React, { Component } from "react";
import { Button, Pagination, Divider, Modal } from "antd";
import Header from "../../components/Header";
import VideoModal from "../../components/VideoModal";
import QRCode from "qrcode.react";
import request, { version } from "../../utils";
import "./index.less";
const default_avatar = require("../../assets/default_user.png");
var imgFileUrl = null;

class Users extends Component {
  state = {
    list: [],
    pagination: {
      current_page: 1,
      pageSize: 6,
      total: 0,
      onChange: (page) => {
        console.log(page);
        this.getList(page)
      }
    },
    showVideo: false,
    videoUrl: ""
  };
  componentDidMount() {
    this.getList()
  }
  getList = (page = 1) => {
    request
      .get(`/api/org/${this.props.match.params.id}/xuanshi/list?per_page=6&page=${page}`)
      .then(res => {
        console.log(res.data);
        this.setState({
          list: res.data.data,
          pagination: {
            current_page: res.data.current_page,
            pageSize: 6,
            total: res.data.total,
            onChange: (page) => {
              console.log(page);
              this.getList(page)
            }
          }
        });
      });
  }
  openVideo = (videoUrl, user) => () => {
    this.setState({
      showVideo: true,
      videoUrl,
      user
    });
  };
  closeVideo = () => {
    this.setState({
      showVideo: false,
      videoUrl: '',
      user: undefined
    });
  }
  print = user => () => {
    // Modal.confirm({})
    this.setState({
      printContent: <div className="preview">
        <div className="preview-image">
          <img id="preview-image" alt="" />
        </div>
        <div className="preview-info">
          <div className="preview-title">
            <img
              src={require("../../assets/logo.png")}
              width="20"
              alt=""
            />
            {sessionStorage.getItem("orgName") || localStorage.getItem("orgName")}
          </div>
          <div style={{ display: 'flex' }}>
            {
              version ? <ul className="developer">
                <li>技术支持：中流砥柱信息系统  </li>
                <li>www.1921dangjian.cn</li>
              </ul> : null
            }
            <span className="qr-code">
              <QRCode value={`http://xsfxy.ninewe.com/?id=${user.project_id}&uid=${user.id}&type=${user.type}`} size={40} />
            </span>
          </div>
        </div>
      </div>
    }, () => {
      let canvas = document.createElement("canvas");
      canvas.width = 1280;
      canvas.height = 720;
      var context = canvas.getContext("2d");


      var previewImage = document.getElementById("preview-image");
      // var dataUrl = canvas.toDataURL("image/png"); //获取canvas对象图形的外部url
      previewImage.src = user.image;
      previewImage.onload = function () {
        context.drawImage(previewImage, 0, 0, 1280, 720);
        window.print()
      }
      // imgFileUrl = dataUrl
    })
  }
  render() {
    const { list, pagination, showVideo, videoUrl, printContent } = this.state;
    const orgName = sessionStorage.getItem("orgName") || localStorage.getItem('orgName');
    return (
      <div className="users">
        <Header title="重温誓词" back="/" />
        <div className="users_body">
          {list.map((e, i) => {
            if (e.type === 'dangyuan') {
              return <div className="users_item" key={i}>
                <img
                  width="100%"
                  height="210px"
                  src={e.image || default_avatar}
                  alt=""
                />
                <div className="users_item_content">
                  <div style={{ width: "60%" }}>
                    <h3>姓名：{e.name}</h3>
                    <p>党支部：{sessionStorage.getItem("orgName") || localStorage.getItem("orgName")}
                    </p>
                  </div>
                  <div>
                    <Button type="primary" size='small' onClick={this.print(e)}>
                      打印
                </Button>
                    <Divider type='vertical'></Divider>
                    <Button type="primary" size='small' onClick={this.openVideo(e.video, e)}>
                      播放
                </Button>
                  </div>
                </div>
              </div>
            } else {
              return <div className="users_item" key={i}>
                <img
                  width="100%"
                  height="210px"
                  src={e.image || default_avatar}
                  alt=""
                />
                <div className="users_item_content">
                  <div style={{ width: "60%" }}>
                    <h3>组织：{e.name}</h3>
                  </div>
                  <div>
                    <Button type="primary" size='small' onClick={this.print(e)}>
                      打印
                </Button>
                    <Divider type='vertical'></Divider>
                    <Button type="primary" size='small' onClick={this.openVideo(e.video, e)}>
                      播放
                </Button>
                  </div>
                </div>
              </div>
            }
          })}
          <div className="pagination" style={{ width: "1075px" }}>
            <Pagination {...pagination} />
          </div>
          <VideoModal show={showVideo} close={this.closeVideo} videoUrl={videoUrl} user={this.state.user} />
        </div>
        {
          printContent
        }
      </div>
    );
  }
}

export default Users;
