import React, { Component } from "react";
import { Table,Button } from "antd";
import Header from "../../components/Header";
import request from "../../utils";
import "./index.less";

let id, orgName;

class RecordUserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list:[]
    };
  }
  columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "性别",
      dataIndex: "sex",
      key: "sex",
      render: sex => sex ? '男' :'女'
    },
    {
      title: "党支部",
      render: () => orgName
    },
    {
      title: "入党时间",
      dataIndex: "in_time",
      key: "in_time"
    },
    {
      title: "操作",
      key: "operation",
      render: (text, record) => (
        <Button type="primary" onClick={this.record(record)}>
          录制
        </Button>
      )
    }
  ];
  record = user => () => {
    this.props.history.push(`/${id}/confirm/${user.id}`);
    sessionStorage.setItem('user',JSON.stringify(user))
  };
  componentDidMount = () => {
    id = sessionStorage.getItem("org");
    orgName = sessionStorage.getItem("orgName");
    request
      .get(`/api/org/${sessionStorage.getItem("org")}/dangyuan`)
      .then(res => {
          this.setState({
            list:res.data.data
          })
      });
  };

  render() {
    return (
      <div className='recordUserList'>
        <Header title="党员信息" back={`/${id}`} />
        <div style={{maxWidth:1000,margin:'30px auto 0 auto',padding:10, backgroundColor:'#fff'}}>
        <Table columns={this.columns} dataSource={this.state.list}
            pagination={{defaultPageSize:8}}
         rowKey='id' />
        </div>
      </div>
    );
  }
}

export default RecordUserList;
