import React, { Component } from "react";
import { Table,Button } from "antd";
import Header from "../../components/Header";
import request from "../../utils";
import "./index.less";

let id, orgName, type;

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
  columnsOrg = [
    {
      title: "党支部名称",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "操作",
      key: "operation",
      width: 120,
      render: (text, record) => (
        <Button type="primary" onClick={this.record(record)}>
          录制
        </Button>
      )
    }
  ];
  record = user => () => {
    this.props.history.push(`/${id}/confirm/${user.id}/${type}`);
    sessionStorage.setItem('user',JSON.stringify(user))
  };
  componentDidMount = () => {
    id = sessionStorage.getItem("org");
    orgName = sessionStorage.getItem("orgName");
    type = +this.props.match.params.type;

    const url = `/api/org/${sessionStorage.getItem("org")}/${type ? 'dangyuan': 'team'}`;
    request
      .get(url)
      .then(res => {
          this.setState({
            list:res.data.data
          })
      });
   
  };

  render() {
    const type = +this.props.match.params.type;
    const typeName =  type? '党员信息': '党组织信息';
    return (
      <div className='recordUserList'>
        <Header title={typeName} back={`/${id}/initialHeart`} />
        <div style={{maxWidth:1000,margin:'30px auto 0 auto',padding:10, backgroundColor:'#fff'}}>
        <Table columns={type ?this.columns: this.columnsOrg} dataSource={this.state.list}
            pagination={{defaultPageSize:8}}
         rowKey='id' />
        </div>
      </div>
    );
  }
}

export default RecordUserList;
