import React, { Component } from "react";
import { Modal, Icon } from "antd";
import QRCode from "qrcode.react";
import "./index.less";

class VideoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    const { show, videoUrl, user } = this.props;
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
        <Icon type='close' onClick={this.props.close} style={{ color: '#fff', position: 'absolute', right: '0', padding: 20, zIndex: 99 }}></Icon>
        <video width="100%" height="100%" src={videoUrl} autoPlay />
        <div className='video_qrcode' style={{ zIndex: 999 }}>
          <QRCode value={`http://xsfxy.ninewe.com/?id=${user.project_id}&uid=${user.id}&type=${user.type}`} size='100'></QRCode>
        </div>
      </Modal>
    );
  }
}

export default VideoModal;
