import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.less";
export default class Header extends Component {
  render() {
    const { title, back = '', type } = this.props;
    const bg = {
      backgroundColor: "#db3036"
    };
    const p = {
      color: "#fff"
    };
    const icon = type
      ? require("../../assets/back_icon_white.png")
      : require("../../assets/back-icon.png");
    const showBack = this.props.showBack === false ? this.props.showBack : true;
    return (
      <div className="header" style={type ? bg : {}}>
        <p style={type ? p : {}}>{title}</p>
        {showBack ? (
          <Link to={back}>
            <img src={icon} alt="" />
          </Link>
        ) : null}
      </div>
    );
  }
}
