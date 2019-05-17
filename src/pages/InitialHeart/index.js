import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { Pagination, Button } from "antd";
import RecordUserList from "../../pages/recordUserList";
import Header from "../../components/Header";
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
              {/* <img src={require("../../assets/initial-heart-team.png")} /> */}
              <p>党支部</p>
              <p>集体宣誓</p>
            </div>
          </Link>
          <Link to={`/${id}/initialHeart/recordList/1`}>
            <div className="journey_item">
              {/* <img src={require("../../assets/initial-heart-person.png")} /> */}
              <p>党员</p>
              <p>个人宣誓</p>
            </div>
          </Link>
        </div>
      </>
    );
  }
}

export default InitialHeart;