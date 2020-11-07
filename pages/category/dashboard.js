import MainLayout from '@layouts/main'
import { PageHeader, Descriptions, Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';

export default function Example() {
  const [state, setState] = useState({
    cfInfo: {},
    accountInfo: {},
    loading: true
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = {};

        const decoded = jwt.decode(Cookies.get('access_token'));
        data.cfInfo = decoded.CfInfo;

        const accountResult = await axios.get('/account');
        if (accountResult.data.Status.Code === '0') {
          data.accountInfo = accountResult.data.AccountInfo;
        } else {
          throw accountResult.data.Status.Message;
        }

        const narResult = await axios.get('/nar');
        if (narResult.data.Status.Code === '0') {
          data.nar = narResult.data.Nar;
        } else {
          throw narResult.data.Status.Message;
        }

        setState({ ...data, loading: false })
      } catch (e) {
        alert(e);
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
    col: {
      borderRadius: 10,
    },
    header: {
      paddingLeft: 0,
    },
    headerInfo: {
      marginTop: -45,
      marginLeft: 255,
      fontWeight: 'bold'
    }
  }
  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục"
        style={ style.header }
      />
      <Descriptions column={1} style={ style.headerInfo } className="category-dashboard-header">
        <Descriptions.Item label="· Hạng thành viên">{state?.cfInfo?.CustClass ?? '-'}</Descriptions.Item>
        <Descriptions.Item label="· Số điểm hiện tại">{state?.accountInfo?.Invested ?? '-'}</Descriptions.Item>
      </Descriptions>

      <Card loading={state.loading} style={style.info} className="mt-3 category-dashboard">
        <Row>
          <Col span={11} style={style.col}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tổng tài sản">{state?.accountInfo?.TotalAsset ? state?.accountInfo?.TotalAsset + ' VND' : '-'}</Descriptions.Item>
              <Descriptions.Item label="Số dư có thể đầu tư">{state?.accountInfo?.AvlAmt + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Số dư đã đầu tư">{state?.accountInfo?.Invested + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Số dư chờ khớp lệnh">{state?.accountInfo?.BlockAmt}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col offset={2}span={11} style={style.col}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Khoản đầu tư">{state?.accountInfo?.BlockAmt ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="Thu thập ròng">{state?.accountInfo?.EstProfit + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Tỷ suất sinh lời bình quân">{state?.nar + '%'}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </MainLayout>
  )
}
