import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Table, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../../configs/api-request';

export default function Example() {
  const columns = [
    {
      title: 'Loại khác hàng',
      dataIndex: 'typeCustomer', 
      key: 'typeCustomer',
    },
    {
      title: 'Ngành nghề',
      dataIndex: 'career',
      key: 'career',
    },
    {
      title: 'Lợi tức đầu tư',
      key: 'investmentReturn',
      dataIndex: 'investmentReturn',
    },
    {
      title: 'Kì hạn đầu tư',
      key: 'investmentTerm',
      dataIndex: 'investmentTerm',
    },
    {
      title: 'Số tiền đầu tư',
      key: 'investmentAmount',
      dataIndex: 'investmentAmount',
    }
  ];

  const styleTable = {
    bordered: true,
    loading: true
  }

  const [state, setState] = useState({
    styleTable: {
      bordered: true,
      loading: true
    }
  });

  useEffect(() => {
    const setTableSource = item => {
      return {
        key: item.ID,
        typeCustomer: item.CustType,
        career: item.Sector,
        investmentReturn: item.MinRate - item.MaxRate,
        investmentTerm: item.MinTerm - item.MaxTerm,
        investmentAmount: item.MinAmt - item.MaxAmt
      };
    };

    async function fetchData() {
      try {
        const decoded = jwt.decode(Cookies.get('access_token'));
        const body = {
          header: {
            Sessionid: decoded.CfInfo.SessionID,
          },
          CustId: decoded.CfInfo.CustID,
        };
        const { data } = await axios.post("/getAutoInvests", body);
        console.log("aaa:"+data);
        setState({
          styleTable: {
            bordered: true,
            loading: false
          },
          cfInfo: decoded.CfInfo,
          reInfoList: data.REInfoList ? data.REInfoList.map(setTableSource) : [],
          
        });
      } catch (e) {
        console.log(e);
      };
    };
    fetchData(); 
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh sách"
        style={{ paddingLeft: 0 }}
      />

      <Descriptions title="Các Robot đang hoạt động">
        <div className="mt-5">
          <Table
            {...state.styleTable}
            dataSource={state.reInfoList}
            columns={columns}
          />
        </div>
      </Descriptions>
    </MainLayout>
  )
}