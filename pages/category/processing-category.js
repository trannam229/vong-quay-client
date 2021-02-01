import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Input, Card, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import { numberWithCommas } from '@configs/helper';
import moment from 'moment';
import { unionBy } from 'lodash';

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    orderBookInfo: [],
    totalAmt: 0,
    columns: [],
  });
  let sectors = [];

  const getSectorName = sector => {
    const sectorObj = sectors.find(item => item.Val === sector);
    return sectorObj ? sectorObj.Content : 'No info';
  }

  const setTableSource = item => {
    return {
      key: item.ReqID,
      name: item.ShortName || 'No data available',
      sector: getSectorName(item.Sector),
      time: moment(item.IRegDate).utc().format('DD/MM/YYYY'),
      class: item.CustClass,
      int: item.Int + '%',
      amt: numberWithCommas(item.IRegAmt),
      term: item.Term + ' tháng'
    };
  };

  const fetchData = async () => {
    try {
      const sectorsResult = await axios.get('/sectors');
      sectors = sectorsResult.data.Sectors.SectorInfo;

      const params = {
        OffsetNumber: '',
        TotalItem: '',
        CurrentIndex: '',
        FromDate: '2019-10-22',
        ToDate: '2020-10-22',
      }
      const orderBookResult = await axios.get('/order-book', { params });
      const processingOrders = orderBookResult.data.OrderList ? orderBookResult.data.OrderList.OrderInfo.filter(item => item.OrdStatus === 'Chờ khớp') : [];
      const orderBookInfo = processingOrders.map(setTableSource)
      const totalAmt = processingOrders.reduce((accumulator, currentItem) => +accumulator + +currentItem.IRegAmt, 0);
      const filterSector = unionBy(processingOrders.map(setTableSource), 'sector').map(({ sector }) => ({ text: sector, value: sector }));
      const filterClass = unionBy(processingOrders.map(setTableSource), 'class').map(({ class: c }) => ({ text: c, value: c }));
      const filterTerm = unionBy(processingOrders.map(setTableSource), 'term').map(({ term }) => ({ text: term, value: term }));
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
          filters: filterSector,
          onFilter: (value, record) => record.sector.indexOf(value) === 0
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
          filters: filterClass,
          onFilter: (value, record) => record.class.indexOf(value) === 0
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
          filters: filterTerm,
          onFilter: (value, record) => record.term.indexOf(value) === 0
        },
      ];
      setState({
        orderBookInfo,
        totalAmt,
        columns
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const style = {
    info: {
      backgroundColor: 'none',
      width: 900,
      margin: '0 auto',
      borderStyle: 'none',
    },
    infoDetail: {
      borderRadius: 50,
      backgroundColor: '#c2f1ff',
      padding: '15px 0',
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

      <Card className="processing-category-card" size="small" loading={loading} style={style.info}>
        <Row>
          <Col span="7" offset="3" style={style.infoDetail}>
            <p className="mb-0">
              <b className="font-size-16">{state.orderBookInfo.length}</b>
              <br />
            Khoản chờ khớp lệnh
            </p>
          </Col>
          <Col span="7" offset="2" style={style.infoDetail}>
            <p className="mb-0">
              <b className="font-size-16">{numberWithCommas(state.totalAmt) + ' VND'}</b>
              <br />
            Số dư chờ khớp lệnh
            </p>
          </Col>
        </Row>
      </Card>

      <Table
        className="mt-1 processing-category"
        bordered="true"
        loading={loading}
        dataSource={state.orderBookInfo}
        columns={state.columns}
        pagination={{ defaultPageSize: 9 }}
      />
    </MainLayout>
  )
}
