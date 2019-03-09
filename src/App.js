import React, { Component } from "react";
import { Link } from "react-router-dom";
import data_db from './utils/nedb'
import "./App.less";

class App extends Component {
  clear = () => {
    localStorage.clear();
    sessionStorage.clear();
    data_db.remove({}, { multi: true },  (err, numRemoved) => {
      alert('缓存清除！')
      this.props.history.push('/')
    });
  }
  render() {
    const id = this.props.match.params.id
    return (
      <div className="App">
        <div className="clear" onClick={this.clear}></div>
        <div className="App-logo" />
        <div className="App-header">不忘初心 铭记此刻</div>
        <div className="App-body">
          <Link to={`/${id}/journey`}>
            <div className="body-item">
              <img src={require("./assets/app_icon_1.png")} alt="" />
              <p>党的征程</p>
            </div>
          </Link>
          {/* <Link to={`/${id}/recordUserList`}> */}
          <Link to={`/${id}/initialHeart`}>
            <div className="body-item">
              <img src={require("./assets/app_icon_2.png")} alt="" />
              <p>记录初心</p>
            </div>
          </Link>
          <Link to={`/${id}/users`}>
            <div className="body-item">
              <img src={require("./assets/app_icon_3.png")} alt="" />
              <p>重温誓词</p>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default App;
