import React, { Component } from "react";
import { Link } from "react-router-dom";
import request from "../../utils";
import { Modal, Progress } from "antd";
import * as qiniu from "qiniu-js";
import styles from "./index.less";

var recorder = null;
var chunks = [];
var stream = null;
var videoSource;

class RecordDemo extends Component {
  state = {
    content: null,
    qiniu: {
      domain: "",
      token: ""
    },
    videoState: "stop",
    uploadProgress: false, // 上传进度弹窗
    progress: 0
  };
  componentWillUnmount = () => {
    stream && stream.stop();
  };
  componentDidMount = () => {
    this.getQiNiuToken();
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: { width: 1280, height: 720 } })
      .then(mediaStream => {
        var video = document.querySelector("video");
        var option = {
          mimeType: 'video/webm'
        }
        stream =
          typeof mediaStream.stop === "function"
            ? mediaStream
            : mediaStream.getTracks()[0];
        video.srcObject = mediaStream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
        recorder = new MediaRecorder(mediaStream, option);
        recorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
        recorder.onstop = function (e) {
          videoSource = new Blob(chunks, { type: "video/mp4" });
          // videoSource = URL.createObjectURL(blob);
        };
        recorder.onstart = function (e) {
          chunks = [];
          console.log(chunks);
          console.log("recorder start");
        };
      });
  };
  record = () => {
    const { videoState } = this.state;
    recorder.start(1000);
    chunks = [];
    this.setState({
      content: (
        <div className="shot_btn" style={{ flexDirection: "row" }}>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>取消</p>
            <img
              onClick={this.retry}
              src={require("../../assets/record_retry.png")}
              alt=""
            />
          </div>

          {videoState === "stop" || videoState === "recording" ? (
            <div>
              <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>暂停</p>
              <img
                onClick={this.pause}
                src={require("../../assets/record_pause.png")}
                alt=""
              />
            </div>
          ) : null}
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>确认</p>
            <img
              onClick={this.upload}
              src={require("../../assets/record_save.png")}
              alt=""
            />
          </div>
        </div>
      ),
      videoState: "recording"
    });
    if (this.state.videoState === "recording") return console.log("正在录制");
  };
  upload = () => {
    if (recorder) {
      recorder.stop();
      // var video = document.querySelector("video");
      // video.srcObject = undefined;
      // recorder = undefined;
    }
    // let file = dataURLtoBlob(videoSource);
    setTimeout(() => {
      let { token, domain } = this.state.qiniu;
      let history = this.props.history;
      let self = this;
      let { id, uid, type } = this.props.match.params;
      let typeName = type == 1 ? 'dangyuan' : 'team'
      const url = `org/${id}/${typeName}/${uid}/video.mp4`
      var observable = qiniu.upload(
        videoSource,
        url,
        token,
        {
          fname: "",
          params: {},
          mimeType: null
        }
      );
      var observer = {
        next(res) {
          // ...
          console.log(res);
          self.setState({
            progress: res.total.percent.toFixed(),
            uploadProgress: res.total.percent.toFixed() === 100 ? false : true
          })
        },
        error(err) {
          // ...
        },
        complete(res) {
          // ...
          history.push(`/${id}/finish`);
        }
      };
      var subscription = observable.subscribe(observer);
      this.setState({
        uploadProgress: true
      });
    }, 1000);
  };
  retry = () => {
    recorder.stop();
    chunks = [];
    this.setState({
      videoState: "stop"
    });
  };
  pause = () => {
    recorder.pause();
    this.setState({
      videoState: "pause",
      content: (
        <div className="shot_btn" style={{ flexDirection: "row" }}>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>取消</p>

            <img
              onClick={this.retry}
              src={require("../../assets/record_retry.png")}
              alt=""
            />
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>继续拍摄</p>

            <img
              onClick={this.goon}
              src={require("../../assets/record_start.png")}
              alt=""
            />
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>确认</p>
            <img
              onClick={this.upload}
              src={require("../../assets/record_save.png")}
              alt=""
            />
          </div>
        </div>
      )
    });
  };
  goon = () => {
    console.log('goon');
    this.setState({
      videoState: "recording",
      content: (
        <div className="shot_btn" style={{ flexDirection: "row" }}>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>取消</p>

            <img
              onClick={this.retry}
              src={require("../../assets/record_retry.png")}
              alt=""
            />
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>继续拍摄</p>
            <img
              onClick={this.pause}
              src={require("../../assets/record_pause.png")}
              alt=""
            />
          </div>
          <div>
            <p style={{ textAlign: "center", fontSize: 30, marginBottom: 0 }}>确认</p>
            <img
              onClick={this.upload}
              src={require("../../assets/record_save.png")}
              alt=""
            />
          </div>
        </div>
      )
    });
    recorder.resume();
  };
  getQiNiuToken = () => {
    request.get("/api/qiniu/token").then(res => {
      this.setState({
        qiniu: res.data
      });
    });
  };
  render() {
    const backIcon = require("../../assets/back_icon_white.png");
    const content = this.state.content;
    let { id, uid, type } = this.props.match.params;
    let { videoState } = this.state;
    return (
      <React.Fragment>
        <div className="record">
          <div className="record_header">
            录制
            <Link to={`/${id}/confirm/${uid}/${type}`}>
              <img src={backIcon} alt="" />
            </Link>
          </div>
          {videoState !== "stop" ? <div style={{
            textAlign: 'center',
            position: 'relative',
            top: '20%',
            color: ' #fff',
            zIndex: '99',
            fontSize: '28px',
            fontWeight: 'bolder'
          }}>现在是视频录制模式</div> : (
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
          <video src="" width="100%" height='750px' style={{ objectFit: 'fill' }} id="video" muted />
          {videoState === "pause" || videoState === "recording" ? (
            content
          ) : (
              <div className="shot_btn" onClick={this.record}>
                <img src={require("../../assets/record_start.png")} alt="" />
              </div>
            )}
        </div>
        <Modal
          visible={this.state.uploadProgress}
          footer={null}
          maskClosable={false}
          style={{ textAlign: 'center' }}
        >
          <Progress type="circle" percent={Number(this.state.progress)} />
        </Modal>
      </React.Fragment>
    );
  }
}

export default RecordDemo;
