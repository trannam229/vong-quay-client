import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Card, Form, DatePicker, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import moment from 'moment';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const columns = [
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      width: 229
    },
    {
      title: 'Số REF',
      dataIndex: 'ref',
      key: 'ref',
      width: 145
    },
    {
      title: 'Nội dung',
      dataIndex: 'description',
      key: 'description',
      width: 790
    },
    {
      title: 'Số tiền',
      key: 'amt',
      dataIndex: 'amt',
    },
  ];

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    accountInfo: {},
    ciInfo: [],
  });
  const setTableSource = item => {
    return {
      key: item.RN,
      time: moment(item.txdate).utc().format('DD/MM/YYYY | HH:mm:ss'),
      ref: item.txnum,
      description: item.txdesc,
      amt: item.Credit ? numberWithCommas(item.Credit) : numberWithCommas(-item.Debit)
    };
  };

  const fetchData = async (date1, date2) => {
    try {
      const data = {};

      const accountResult = await axios.get('/account');
      data.accountInfo = accountResult.data.AccountInfo;

      const params = {
        OffsetNumber: '',
        TotalItem: '',
        CurrentIndex: '',
        FromDate: date1 || moment().subtract(1, 'year').format('YYYY-MM-DD').toString(),
        ToDate: date2 || moment().format('YYYY-MM-DD').toString(),
      }
      const ciResult = await axios.get('/ci', { params });
      data.ciInfo = ciResult.data.CIInfoList ? ciResult.data.CIInfoList.CIInfo.map(setTableSource) : [];

      setState(data);
      setLoading(false);
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
      backgroundColor: '#c2f1ff',
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

      <Row className="account-statement-row">
        <Col span={8}>
          <p className="font-weight-bold">Số dư khả dụng: {loading ? '' : numberWithCommas(state?.accountInfo?.AvlAmt) + ' VND'}</p>
        </Col>
        <Col span={10} offset={6}>
          <Form layout="horizontal">
            <Form.Item label="Thời gian" name="dateRange" style={{ color: '#03b1fe' }}>
              <DatePicker.RangePicker style={{ width: '100%' }} onChange={handleDateChange} defaultValue={[moment().subtract(1, 'year'), moment()]} />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Card size="small" loading={loading} style={style.info} className="account-statement-card">
        <Row>
          <Col span="6" offset="1" style={style.infoDetail}>
            Tổng phát sinh tăng
            <br />
            <b>{(state?.accountInfo?.TotalAsset ? numberWithCommas(state?.accountInfo?.TotalAsset) : 0) + ' VND'}</b>
          </Col>
          <Col span="6" offset="2" style={style.infoDetail}>
            Tổng phát sinh giảm
            <br />
            <b>{(state?.accountInfo?.TotalAsset? numberWithCommas(state?.accountInfo?.AvlAmt) : 0) + ' VND'}</b>
          </Col>
          <Col span="6" offset="2" style={style.infoDetail}>
            Số dư cuối kỳ
            <br />
            <b>{(state?.accountInfo?.TotalAsset ? numberWithCommas(state?.accountInfo?.Invested) : 0) + ' VND'}</b>
          </Col>
        </Row>
      </Card>

      <div className="">
        <p className="font-weight-bold" style={{ fontSize: '16px', marginBottom: 0 }}>Sao kê chi tiết</p>
        <Table
          bordered="true"
          loading={loading}
          dataSource={state.ciInfo}
          columns={columns}
          className="account-statement"
        />
      </div>
    </MainLayout>
  )
}
