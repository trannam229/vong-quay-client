import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Input, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Số REF',
      dataIndex: 'ref',
      key: 'ref',
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số tiền',
      key: 'amt',
      dataIndex: 'amt',
    },
  ];

  const [state, setState] = useState({
    accountInfo: {},
    ciInfo: [],
    styleTable: {
      loading: true
    }
  });

  useEffect(() => {
    const setTableSource = item => {
      return {
        key: item.RN,
        time: item.txdate,
        ref: item.txnum,
        description: item.txdesc,
        amt: item.InitBalance
      };
    };

    async function fetchData() {
      try {
        const data = {
          styleTable: {
            loading: true
          }
        };

        const accountResult = await axios.get('/account');
        if (accountResult.data.Status.Code === '0') {
          data.accountInfo = accountResult.data.AccountInfo;
        } else {
          alert(accountResult.data.Status.Message)
        }

        const params = {
          OffsetNumber: '',
          TotalItem: '',
          CurrentIndex: '',
          FromDate: '2019-10-22T21:32:52.12679',
          ToDate: '2020-10-22T21:32:52.12679',
        }
        const ciResult = await axios.get('/ci', { params });
        if (ciResult.data.Status.Code === '0') {
          data.ciInfo = ciResult.data.CIInfoList ? ciResult.data.CIInfoList.CIInfo.map(setTableSource) : [];
          data.styleTable.loading = false;
        } else {
          alert(ciResult.data.Status.Message)
        }

        setState(data)
      } catch (e) {
        alert(e);
      }
    }

    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục đầu tư (Cần xem lại API)"
        style={{ paddingLeft: 0 }}
      />

        <Table
          bordered="true"
          loading={state.styleTable.loading}
          dataSource={state.ciInfo}
          columns={columns}
        />
    </MainLayout>
  )
}
