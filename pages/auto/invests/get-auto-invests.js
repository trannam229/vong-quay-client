import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Table, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../../configs/api-request';

export default function GetAutoInvests() {
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
        investmentReturn: item.MinRate + " - " + item.MaxRate,
        investmentTerm: item.MinTerm + " - " + item.MaxTerm,
        investmentAmount: item.MinAmt + " - " + item.MaxAmt
      };
    };

    async function fetchData() {
      try {
        let sectors;
        const sectorsResult = await axios.get('/sectors');
        if (sectorsResult.data.Status.Code === '0') {
          sectors = sectorsResult.data.Sectors.SectorInfo;
        } else {
          console.log(accountResult.data.Status.Message)
        }

        const data = await axios.get("/get-auto-invests");
        const result = data.GetAutoInvestsResult.AutoInvestList.AutoInvestInfo ? data.GetAutoInvestsResult.AutoInvestList.AutoInvestInfo.filter(function (investInfo) {
          return investInfo.hasOwnProperty('CustType');
        }).map(setTableSource) : [];
        setState({
          styleTable: {
            bordered: true,
            loading: false
          },
          cfInfo: decoded.CfInfo,
          reInfoList: result,

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