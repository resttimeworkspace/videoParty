import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./index.less";
import App from "./App";
import Records from "./pages/records";
import RecordDemo from "./pages/recordDemo";
import Journey from "./pages/journey";
import Users from "./pages/users";
import Confirm from "./pages/confirm";
import ChooseORG from "./pages/chooseORG";
// import RecordUserList from "./pages/recordUserList";
import Finish from "./pages/finish";
import InitialHeart from './pages/InitialHeart'
let hasOrg = sessionStorage.getItem("org");
ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={ChooseORG} />
      <Route exact path="/:id" component={App} />
      <Route exact path="/:id/finish" component={Finish} />
      <Route exact path="/:id/records/:uid/:type" component={Records} />
      <Route exact path="/:id/recordDemo/:uid/:type" component={RecordDemo} />
      {/* <Route exact path="/:id/recordUserList" component={RecordUserList} /> */}
      <Route path="/:id/initialHeart" component={InitialHeart} />
      <Route exact path="/:id/confirm/:uid/:type" component={Confirm} />
      <Route path="/:id/journey" component={Journey} />
      <Route exact path="/:id/users" component={Users} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
