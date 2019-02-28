import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Pagination, Button } from "antd";
import Header from "../../components/Header";
import VideoModal from "../../components/VideoModal";
import request from "../../utils";
import styles from "./index.less";
const Fragment = React.Fragment;
const defaultPic = require("../../assets/default_new.png");
class Journey extends Component {
  render() {
    return (
      <div className="journey">
        <Route exact path="/:id/journey" component={Journey_Body} />
        <Route exact path="/:id/journey/history" component={Journey_History} />
        <Route exact path="/:id/journey/memory" component={Journey_Memory} />
        <Route exact path="/:id/journey/redtour" component={Journey_Redtour} />
        <Route exact path="/:id/journey/study" component={Journey_Study} />
      </div>
    );
  }
}

class Journey_Body extends Component {
  render() {
    const id = this.props.match.params.id;
    return (
      <Fragment>
        <Header title={"党的征程"} back={"/"} />
        <div className="journey_body">
          <Link to={`/${id}/journey/study`}>
            <div className="journey_item">
              <img src={require("../../assets/study_icon.png")} />
              <p>学习路上</p>
            </div>
          </Link>
          <Link to={`/${id}/journey/history`}>
            <div className="journey_item">
              <img src={require("../../assets/history_icon.png")} />
              <p>百年党史</p>
            </div>
          </Link>
          <Link to={`/${id}/journey/redtour`}>
            <div className="journey_item">
              <img src={require("../../assets/redJourney_icon.png")} />
              <p>红色旅程</p>
            </div>
          </Link>
          <Link to={`/${id}/journey/redtour`}>
            <div className="journey_item">
              <img src={require("../../assets/memory_icon.png")} />
              <p>时代记忆</p>
            </div>
          </Link>
        </div>
      </Fragment>
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
      <Fragment>
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
      </Fragment>
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
      <Fragment>
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
      </Fragment>
    );
  }
}

class Journey_Memory extends Component {
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
    request.get(`/api/org/${id}/xuanchuan/时代记忆?page=${page}`).then(res => {
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
      <Fragment>
        <Header title={"时代记忆"} back={`/${id}/journey`} />
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
      </Fragment>
    );
  }
}

class Journey_Study extends Component {
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
    request.get(`/api/org/${id}/xuanchuan/学习路上?page=${page}`).then(res => {
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
      <Fragment>
        <Header title={"学习路上"} back={`/${id}/journey`} />
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
      </Fragment>
    );
  }
}

export default Journey;
