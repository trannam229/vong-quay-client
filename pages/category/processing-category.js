import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
  const columns = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngành',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Hạng',
      key: 'class',
      dataIndex: 'class',
    },
    {
      title: 'Lợi suất',
      dataIndex: 'int',
      key: 'int',
    },
    {
      title: 'Số tiền',
      dataIndex: 'amt',
      key: 'amt',
    },
    {
      title: 'Kỳ hạn',
      key: 'term',
      dataIndex: 'term',
    },
  ];

  const [state, setState] = useState({
    orderBookInfo: [],
    styleTable: {
      loading: true
    },
    totalAmt: 0
  });

  useEffect(() => {
    const setTableSource = item => {
      return {
        key: item.ReqID,
        name: item.ShortName || 'No data available',
        sector: item.txnum || 'No data available',
        time: item.IRegDate,
        class: item.CustClass,
        int: item.Int,
        amt: item.IRegAmt,
        term: item.Term + ' tháng'
      };
    };

    async function fetchData() {
      try {
        const params = {
          OffsetNumber: '',
          TotalItem: '',
          CurrentIndex: '',
          FromDate: '2019-10-22T21:32:52.12679',
          ToDate: '2020-10-22T21:32:52.12679',
        }
        const orderBookResult = await axios.get('/order-book', { params });
        if (orderBookResult.data.Status.Code === '0') {
          const orderBookInfo = orderBookResult.data.OrderList
            ? orderBookResult.data.OrderList.OrderInfo.filter(item => item.OrdStatus === 'Chờ khớp').map(setTableSource)
            : [];
          const totalAmt = state.orderBookInfo.reduce((accumulator, currentItem) => accumulator + currentItem.amt, 0);

          setState({
            orderBookInfo,
            totalAmt,
            styleTable: {
              loading: false
            },
          })
        } else {
          alert(orderBookResult.data.Status.Message)
        }
      } catch (e) {
        alert(e);
      }
    }

    fetchData();
  }, [state]);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục chờ khớp lệnh"
        style={{ paddingLeft: 0 }}
      />

      <Card size="small" style={{ width: 1000, margin: '0 auto' }}>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Khoản chờ khớp lệnh">{state.orderBookInfo.length}</Descriptions.Item>
          <Descriptions.Item label="Số dư chờ khớp lệnh">{state.totalAmt + ' VND'}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Table
        className="mt-5"
        bordered="true"
        loading={state.styleTable.loading}
        dataSource={state.orderBookInfo}
        columns={columns}
      />
    </MainLayout>
  )
}
