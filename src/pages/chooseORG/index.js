import React, { Component } from "react";
import { Button, Pagination } from "antd";
import Header from "../../components/Header";
import request from "../../utils";
import data_db from "../../utils/nedb";
import "./index.less";
const default_avatar = require("../../assets/default_user.png");
class ChooseORG extends Component {
  state = {
    list: []
  };
  componentDidMount = () => {
    let org = localStorage.getItem("org");
    if (org) {
      this.props.history.push(`/${org}`);
    } else {
      request.get("/api/org").then(res => {
        this.setState({
          list: res.data
        });
      });
      // try {
      //   data_db.find({}, (err, count) => {
      //     if (count.length > 0) {
      //       this.props.history.push(`/${count[count.length - 1].id}`);
      //     } else {
      //       request.get("/api/org").then(res => {
      //         this.setState({
      //           list: res.data
      //         });
      //       });
      //     }
      //   });
      // } catch {
      //   request.get("/api/org").then(res => {
      //     this.setState({
      //       list: res.data
      //     });
      //   });
      // }
    }
  };
  saveOrg = e => () => {
    localStorage.setItem("org", e.id);
    sessionStorage.setItem("org", e.id);
    sessionStorage.setItem("orgName", e.name);
    data_db.insert(e, function(err, new_doc) {
      console.log(err, new_doc);
    });
    this.props.history.push(`/${e.id}`);
  };
  render() {
    let { list } = this.state;
    return (
      <div className="chooseORG">
        <Header title="请选择党组织" showBack={false} />

        <div className="choose_org_body">
          <div className="body_wrap" style={{ maxHeight: 500 }}>
            {list.map((e, i) => (
              <div className="org_item" key={e.id} onClick={this.saveOrg(e)}>
                {e.name}
              </div>
            ))}
          </div>
          {/* <div className="body_wrap" style={{ justifyContent: "flex-end" }}>
            <Pagination />
          </div> */}
        </div>
      </div>
    );
  }
}

export default ChooseORG;
