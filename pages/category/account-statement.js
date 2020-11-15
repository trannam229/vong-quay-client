import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Card, Form, DatePicker, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import moment from 'moment';

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
    loading: true
  });



  const fetchData = async function (date1, date2) {
    try {
      const data = {
        loading: true
      };

      const setTableSource = item => {
        return {
          key: item.RN,
          time: item.txdate,
          ref: item.txnum,
          description: item.txdesc,
          amt: item.InitBalance
        };
      };

      const accountResult = await axios.get('/account');
      if (accountResult.data.Status.Code === '0') {
        data.accountInfo = accountResult.data.AccountInfo;
      } else {
        console.log(accountResult.data.Status.Message)
      }

      const params = {
        OffsetNumber: '',
        TotalItem: '',
        CurrentIndex: '',
        FromDate: date1 || moment().subtract(1, 'year').format('YYYY-MM-DD').toString(),
        ToDate: date2 || moment().format('YYYY-MM-DD').toString(),
      }
      const ciResult = await axios.get('/ci', { params });
      if (ciResult.data.Status.Code === '0') {
        data.ciInfo = ciResult.data.CIInfoList ? ciResult.data.CIInfoList.CIInfo.map(setTableSource) : [];
        data.loading = false;
      } else {
        console.log(ciResult.data.Status.Message)
      }

      setState(data)
    } catch (e) {
      console.log(e);
    }
  }

  const handleDateChange = dates => {
    fetchData(dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'))
  };

  useEffect(() => {
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
      borderRadius: 5,
      backgroundColor: '#D9F5FF',
      padding: '20px 20px',
      textAlign: 'center'
    }
  }

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Sao kê tài khoản"
        style={{ paddingLeft: 0 }}
      />

      <Row>
        <Col span={8}>
          <p className="font-weight-bold">Số dư khả dụng: {state.loading ? '' : state?.accountInfo?.AvlAmt + ' VND'}</p>
        </Col>
        <Col span={10} offset={6}>
          <Form layout="horizontal">
            <Form.Item label="Thời gian" name="dateRange" style={{ color: '#03b1fe' }}>
              <DatePicker.RangePicker style={{ width: '100%' }} onChange={handleDateChange} defaultValue={[moment().subtract(1, 'year'), moment()]} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Card size="small" loading={state.loading} style={style.info} className="mt-2">
        <Row>
          <Col span="6" offset="1" style={style.infoDetail}>
            Tổng phát sinh tăng
            <br />
            <b>{(state?.accountInfo?.TotalAsset || 0) + ' VND'}</b>
          </Col>
          <Col span="6" offset="2" style={style.infoDetail}>
            Tổng phát sinh giảm
            <br />
            <b>{(state?.accountInfo?.AvlAmt || 0) + ' VND'}</b>
          </Col>
          <Col span="6" offset="2" style={style.infoDetail}>
            Số dư cuối kỳ
            <br />
            <b>{(state?.accountInfo?.Invested || 0) + ' VND'}</b>
          </Col>
        </Row>
      </Card>

      <div className="mt-2">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Sao kê chi tiết</p>
        <Table
          bordered="true"
          loading={state.loading}
          dataSource={state.ciInfo}
          columns={columns}
          className="account-statement"
        />
      </div>
    </MainLayout>
  )
}
