import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Progress } from "antd";
import QRCode from "qrcode.react";
import Header from "../../components/Header";
import request from "../../utils";
import styles from "./index.less";
import * as qiniu from "qiniu-js";

var recorder = null;
var chunks = [];
var stream = null;
var imgFileUrl = null;
class Record extends Component {
  state = {
    content: null,
    qiniu: {
      domain: "",
      token: ""
    },
    uploadProgress: false, // 上传进度弹窗
    progress: 0
  };
  componentWillUnmount = () => {
    // if (recorder) {
    //   //   recorder.stop();
    //   stream.getTracks()[1].stop();
    //   stream.getTracks()[0].stop();
    // }
    stream && stream.stop();
  };

  componentDidMount = () => {
    this.getQiNiuToken();
    navigator.mediaDevices
      .getUserMedia({ audio: false, video: { width: 1280, height: 720 } })
      .then(mediaStream => {
        var video = document.querySelector("video");
        stream =
          typeof mediaStream.stop === "function"
            ? mediaStream
            : mediaStream.getTracks()[0];
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
        // recorder = new MediaRecorder(mediaStream, { mimeType: "video/webm" });
        // recorder.ondataavailable = function(e) {
        //   chunks.push(e.data);
        // };
        // recorder.onstop = function(e) {
        //   var blob = new Blob(chunks, { type: "video/webm" });
        //   var videoSource = URL.createObjectURL(blob);
        // };
        // recorder.start(1000);
      });
  };
  getQiNiuToken = () => {
    request.get("/api/qiniu/token").then(res => {
      this.setState({
        qiniu: res.data
      });
    });
  };
  shot = () => {
    var video = document.getElementById("video");
    let user = JSON.parse(sessionStorage.getItem('user'))
    this.setState(
      {
        content: (
          <div className="photo_modal">
            <Header title="照片确认" showBack={false} type="red" />
            <div className="modal_body">
              {/* <canvas id="canvas" width="400px" height="250px" />
              <iframe style={{ display: "none" }} id="iframe" /> */}
              <div className="preview">
                <div className="preview-image">
                  <img id="preview-image" alt="" />
                  {
                    +this.props.match.params.type ?
                    <span className="qr-code">
                      <QRCode value={`http://xsfxy.ninewe.com/?id=${user.project_id}&uid=${user.id}`} size={60} />
                    </span> : null
                  }
                  
                </div>
                <div className="preview-info">
                  <div className="preview-title">
                    <img
                      src={require("../../assets/logo.png")}
                      width="20"
                      alt=""
                    />
                    {sessionStorage.getItem("orgName")}
                  </div>
                  <ul className="developer">
                    <li>技术支持：中流砥柱信息系统  </li>
                    <li>www.1921dangjian.cn</li>
                  </ul>
                </div>
              </div>
              <div className="btn_group">
                <Button type="primary" onClick={this.upload}>
                  确认
                </Button>
                <Button type="primary" onClick={this.print}>
                  打印
                </Button>
                <Button type="primary" onClick={this.reshot}>
                  重拍
                </Button>
              </div>
            </div>
          </div>
        )
      },
      () => {
        let canvas = document.createElement("canvas");
        canvas.width = 1280;
        canvas.height = 720;
        var context = canvas.getContext("2d");
        context.drawImage(video, 0,0 ,1280,720);

        // recorder.stop();
        // stream.getTracks()[1].stop();
        // stream.getTracks()[0].stop();
        stream.stop();

        var previewImage = document.getElementById("preview-image");
        var dataUrl = canvas.toDataURL("image/png"); //获取canvas对象图形的外部url
        previewImage.src = dataUrl;
        imgFileUrl = dataUrl;
      }
    );
  };
  reshot = () => {
    this.setState(
      {
        content: null
      },
      () => {
        navigator.mediaDevices
          .getUserMedia({ audio: false, video: { width: 1280, height: 720 } })
          .then(mediaStream => {
            var video = document.querySelector("video");
            stream =
              typeof mediaStream.stop === "function"
                ? mediaStream
                : mediaStream.getTracks()[0];
            video.srcObject = mediaStream;
            video.onloadedmetadata = function(e) {
              video.play();
            };
            // recorder = new MediaRecorder(mediaStream, {
            //   mimeType: "video/webm"
            // });
            // recorder.ondataavailable = function(e) {
            //   chunks.push(e.data);
            // };
            // recorder.start(1000);
          });
      }
    );
  };
  upload = () => {
    let file = dataURLtoBlob(imgFileUrl);
    let self = this;
    let { token, domain } = this.state.qiniu;
    let history = this.props.history;
    let { id, uid, type } = this.props.match.params;
    const url = +type
      ? `org/${id}/dangyuan/${uid}/avatar.png`
      : `org/${id}/team/${uid}/image.png`;
    var observable = qiniu.upload(file, url, token, {
      fname: "",
      params: {},
      mimeType: [] || null
    });
    var observer = {
      next(res) {
        // ...
        console.log(res);
        self.setState({
          progress: res.total.percent.toFixed(),
          uploadProgress: res.total.percent.toFixed() === 100 ? false : true
        });
      },
      error(err) {
        // ...
      },
      complete(res) {
        // ...
        // const url = +type ? `/${id}/recordDemo/${uid}/${type}`:`/${id}/finish`
        history.push(`/${id}/recordDemo/${uid}/${type}`);
      }
    };
    var subscription = observable.subscribe(observer);
    this.setState({
      uploadProgress: true
    });
  };
  print = () => {
    // var iframe = document.getElementById("iframe");
    // iframe.contentWindow.print();
    window.print();
  };
  render() {
    const backIcon = require("../../assets/back_icon_white.png");
    const content = this.state.content;
    let id = sessionStorage.getItem("org");
    const {uid, type} = this.props.match.params
    return (
      <React.Fragment>
        <div className="record">
          <div className="record_header">
            拍照
            <Link to={`/${id}/confirm/${uid}/${type}`}>
              <img src={backIcon} alt="" />
            </Link>
          </div>
          {content ? null : (
            <p
              style={{
                color: "#ddd",
                fontSize: "48px",
                position: "absolute",
                left: "39%",
                top: "250px",
                zIndex: 1
              }}
            >
              请正对摄像头
            </p>
          )}

          {content ? (
            content
          ) : (
            <video src="" width="100%" height="720px" id="video" />
          )}
          {content ? null : (
            <div className="shot_btn" onClick={this.shot}>
              <img src={require("../../assets/shot.png")} alt="" />
            </div>
          )}
        </div>
        <Modal
          visible={this.state.uploadProgress}
          footer={null}
          maskClosable={false}
          style={{ textAlign: "center" }}
        >
          <Progress type="circle" percent={Number(this.state.progress)} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default Record;

function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
