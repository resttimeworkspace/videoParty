import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Pagination, Button } from "antd";
import RecordUserList from "../../pages/recordUserList";
import Header from "../../components/Header";
import VideoModal from "../../components/VideoModal";
import request from "../../utils";
import styles from "./index.less";
const defaultPic = require("../../assets/default_new.png");



class InitialHeart extends Component {
  render() {
    return (
      <div className="journey">
        <Route exact path="/:id/initialHeart" component={Journey_Body} />
        <Route exact path="/:id/initialHeart/recordList/:type" component={RecordUserList} />
      </div>
    );
  }
}

class Journey_Body extends Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <>
        <Header title={"记录初心"} back={"/"} />
        <div className="journey_body">
          <Link to={`/${id}/initialHeart/recordList/0`}>
            <div className="journey_item">
              <img src={require("../../assets/initial-heart-team.png")} />
              <p>集体拍照</p>
            </div>
          </Link>
          <Link to={`/${id}/initialHeart/recordList/1`}>
            <div className="journey_item">
              <img src={require("../../assets/initial-heart-person.png")} />
              <p>个人拍照</p>
            </div>
          </Link>
        </div>
      </>
    );
  }
}
class Journey_History extends Component {
  state = {
    list: [],
    pagination: {
      current: 1,
      total: 0
    }
  };
  componentDidMount = () => {
    this.getList();
  };
  getList = (page = 1) => {
    const id = this.props.match.params.id;
    request.get(`/api/org/${id}/xuanchuan/百年党史?page=${page}`).then(res => {
      const { data } = res;
      this.setState({
        pagination: {
          current: data.current_page,
          total: data.total
        },
        list:data.data

      });
    });
  };
  pageChange = pageIndex => {
    this.getList(pageIndex);
  };
  openVideo = videoUrl => () => {
    this.setState({
      showVideo: true,
      videoUrl
    });
  };
  closeVideo = () => {
    this.setState({
      showVideo: false,
      videoUrl: ""
    });
  };
  render() {
    const id = this.props.match.params.id;
    const { pagination, list, showVideo, videoUrl } = this.state;
    return (
      <>
        <Header title={"百年党史"} back={`/${id}/journey`} />
        <div className="table">
          {list.map((e, i) => (
            <div key={e.id} className="table-item">
              <img
                src={`${e.video}?vframe/jpg/offset/1` || defaultPic}
                width={280}
                height={180}
              />
              <div className="table-item-content">
                <h2>{e.name}</h2>
                <p>{e.intro}</p>
                <div className="btn_wrap">
                  <Button type="primary" onClick={this.openVideo(e.video)}>播放</Button>
                </div>
              </div>
            </div>
          ))}
          {pagination.total <= 3 ? null : (
            <div className="pagination">
              <Pagination {...pagination} onChange={this.pageChange} />
            </div>
          )}
        </div>
        <VideoModal
          show={showVideo}
          close={this.closeVideo}
          videoUrl={videoUrl}
        />
      </>
    );
  }
}

class Journey_Redtour extends Component {
  state = {
    list: [],
    pagination: {
      current: 1,
      total: 0
    }
  };
  openVideo = videoUrl => () => {
    this.setState({
      showVideo: true,
      videoUrl
    });
  };
  closeVideo = () => {
    this.setState({
      showVideo: false,
      videoUrl: ""
    });
  };
  componentDidMount = () => {
    this.getList();
  };
  getList = (page = 1) => {
    const id = this.props.match.params.id;
    request.get(`/api/org/${id}/xuanchuan/红色旅程?page=${page}`).then(res => {
      const { data } = res;
      this.setState({
        pagination: {
          current: data.current_page,
          total: data.total
        },
        list:data.data

      });
    });
  };
  pageChange = pageIndex => {
    this.getList(pageIndex);
  };
  render() {
    const id = this.props.match.params.id;
    const { pagination, list, showVideo, videoUrl } = this.state;

    return (
      <>
        <Header title={"红色旅程"} back={`/${id}/journey`} />
        <div className="table">
          {list.map((e, i) => (
            <div key={e.id} className="table-item">
              <img
                src={`${e.video}?vframe/jpg/offset/1` || defaultPic}
                width={280}
                height={180}
              />
              <div className="table-item-content">
                <h2>{e.name}</h2>
                <p>{e.intro}</p>
                <div className="btn_wrap">
                  <Button type="primary" onClick={this.openVideo(e.video)}>播放</Button>
                </div>
              </div>
            </div>
          ))}
          {pagination.total <= 3 ? null : (
            <div className="pagination">
              <Pagination {...pagination} onChange={this.pageChange} />
            </div>
          )}
        </div>
        <VideoModal
          show={showVideo}
          close={this.closeVideo}
          videoUrl={videoUrl}
        />
      </>
    );
  }
}

export default InitialHeart;