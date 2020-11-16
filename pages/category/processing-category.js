import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import { numberWithCommas } from '@configs/helper';

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
    loading: true,
    totalAmt: 0
  });

  useEffect(() => {
    const setTableSource = item => {
      return {
        key: item.ReqID,
        name: item.ShortName || 'No data available',
        sector: item.Sector || 'No data available',
        time: item.IRegDate,
        class: item.CustClass,
        int: item.Int,
        amt: numberWithCommas(item.IRegAmt),
        term: item.Term + ' tháng'
      };
    };

    async function fetchData() {
      try {
        const params = {
          OffsetNumber: '',
          TotalItem: '',
          CurrentIndex: '',
          FromDate: '2019-10-22',
          ToDate: '2020-10-22',
        }
        const orderBookResult = await axios.get('/order-book', { params });
        if (orderBookResult.data.Status.Code === '0') {
          const orderBookInfo = orderBookResult.data.OrderList
            ? orderBookResult.data.OrderList.OrderInfo.filter(item => item.OrdStatus === 'Chờ khớp').map(setTableSource)
            : [];
          const totalAmt = orderBookInfo.reduce((accumulator, currentItem) => accumulator + currentItem.amt, 0);

          setState({
            orderBookInfo,
            totalAmt,
            loading: false
          })
        } else {
          console.log(orderBookResult.data.Status.Message)
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  const style = {
    info: {
      backgroundColor: 'none',
      width: 900,
      margin: '0 auto',
      borderStyle: 'none'
    },
    infoDetail: {
      borderRadius: 50,
      backgroundColor: '#D9F5FF',
      padding: '20px 20px',
      textAlign: 'center'
    }
  }

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục chờ khớp lệnh"
        style={{ paddingLeft: 0 }}
      />

      <Card size="small" loading={state.loading} style={style.info}>
        <Row>
          <Col span="6" offset="3" style={style.infoDetail}>
            <b>{state.orderBookInfo.length}</b>
            <br />
            Khoản chờ khớp lệnh
          </Col>
          <Col span="6" offset="2" style={style.infoDetail}>
            <b>{numberWithCommas(state.totalAmt) + ' VND'}</b>
            <br />
            Số dư chờ khớp lệnh
          </Col>
        </Row>
      </Card>

      <Table
        className="mt-4"
        bordered="true"
        loading={state.loading}
        dataSource={state.orderBookInfo}
        columns={columns}
      />
    </MainLayout>
  )
}
