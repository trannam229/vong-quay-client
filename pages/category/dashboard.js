import MainLayout from '@layouts/main'
import { PageHeader, Descriptions, Card, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';
// import { Column } from '@ant-design/charts';

export default function Example() {
  const [state, setState] = useState({
    cfInfo: {},
    accountInfo: {},
    chart: {},
    nar: 0,
    loading: true
  });

  const fetchData = async function() {
    try {
      const data = {};

      const decoded = jwt.decode(Cookies.get('access_token'));
      data.cfInfo = decoded.CfInfo;

      const accountResult = await axios.get('/account');
      if (accountResult.data.Status.Code === '0') {
        data.accountInfo = accountResult.data.AccountInfo;
      } else {
        console.log(accountResult.data.Status.Message)
        throw accountResult.data.Status.Message;
      }

      const narResult = await axios.get('/nar');
      if (narResult.data.Status.Code === '0') {
        data.nar = narResult.data.Nar;
      } else {
        console.log(narResult.data.Status.Message)
        throw narResult.data.Status.Message;
      }

      const chartResult = await axios.get('/chart-info');
      if (chartResult.data.ProductInfoResult.Status.Code === '0') {
        data.chart = {};
        const rank = chartResult.data.RankInfoResult.RankInfo.Info.map(item => { return { Val: item.Val, Amount: item.Amount } });
        const term = chartResult.data.TermInfoResult.TermInfo.Info.map(item => { return { Val: item.Val, Amount: item.Amount } });
        const productInfo = chartResult.data.ProductInfoResult.ProductInfo.Info.map(item => { return { Val: item.Val, Amount: item.Amount } });
        console.log(rank, term, productInfo)
        data.chart = {
          rankConfig: {
            rank,
            height: 400,
            yField: 'Amount',
            xField: 'Val',
          },
          termConfig: {
            term,
            height: 400,
            yField: 'Amount',
            xField: 'Val',
          },
          productInfoConfig: {
            productInfo,
            height: 400,
            yField: 'Amount',
            xField: 'Val',
          }
        }
      } else {
        throw chartResult.data.ProductInfoResult.Status.Message;
      };

      setState({...data, loading: false});
    } catch (e) {
      console.log(e);
    }
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
    },
    chart: {
      backgroundColor: 'none',
      borderStyle: 'none'
    },
  }

  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];
  const config = {
    data,
    height: 400,
    yField: 'value',
    xField: 'year',
  };

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục"
        style={style.header}
      />
      <Descriptions column={1} style={style.headerInfo} className="category-dashboard-header">
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
          <Col offset={2} span={11} style={style.col}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Khoản đầu tư">{state?.accountInfo?.BlockAmt ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="Thu thập ròng">{state?.accountInfo?.EstProfit + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Tỷ suất sinh lời bình quân">{state?.nar + '%'}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Card loading={state.loading} className="mt-5">
        <Row>
          {/* <Col span={7}>
            <Column {...state.chart.rankConfig} />
          </Col>
          <Col span={6} offset={2}>
            <Column {...state.chart.termConfig} />
          </Col>
          <Col span={7} offset={2}>
            <Column {...state.chart.productInfoConfig} />
          </Col> */}
        </Row>
      </Card>
    </MainLayout>
  )
}
