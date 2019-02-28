import React, { Component } from "react";
import { Modal,Icon } from "antd";
import "./index.less";

class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    const { show, videoUrl } = this.props;
    console.log(show);
    if (!show) return null;
    return (
      <Modal
        visible={show}
        title={null}
        className="videoModal"
        closable={false}
        footer={null}
      >
        <Icon type='close' onClick={this.props.close} style={{color:'#fff', position:'absolute', right:'0', padding:20,zIndex:99}}></Icon>
        <video width="100%" height="100%" src={videoUrl} controls />
      </Modal>
    );
  }
}

export default VideoModal;
