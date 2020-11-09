import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Card, Form, DatePicker, Table } from 'antd';
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
          console.log(accountResult.data.Status.Message)
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
          console.log(ciResult.data.Status.Message)
        }

        setState(data)
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Sao kê tài khoản"
        style={{ paddingLeft: 0 }}
      />

      <Row>
        <Col span={8}>
          <Descriptions>
            <Descriptions.Item label="Số dư khả dụng">{state.accountInfo.AvlAmt}</Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={10} offset={6}>
          <Form layout="horizontal">
            <Form.Item label="Thời gian" name="size">
              <DatePicker.RangePicker style={{ width: '100%' }}/>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Card size="small" style={{ marginTop: '3rem', width: 1000, margin: '0 auto' }}>
        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Tổng phát sinh tăng">{state.accountInfo.TotalAsset}</Descriptions.Item>
          <Descriptions.Item label="Tổng phát sinh giảm">{state.accountInfo.AvlAmt}</Descriptions.Item>
          <Descriptions.Item label="Số dư cuối kỳ">{state.accountInfo.Invested}</Descriptions.Item>
        </Descriptions>
      </Card>

      <div className="mt-2">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Sao kê chi tiết</p>
        <Table
          bordered="true"
          loading={state.styleTable.loading}
          dataSource={state.ciInfo}
          columns={columns}
        />
      </div>
    </MainLayout>
  )
}
