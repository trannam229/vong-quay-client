import MainLayout from '@layouts/main'
import { PageHeader, Descriptions, Card, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';
import { Bar } from 'react-chartjs-2';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    cfInfo: {},
    accountInfo: {},
    nar: 0,
  });

  const fetchData = async function () {
    try {
      const data = {};

      const decoded = jwt.decode(Cookies.get('access_token'));
      data.cfInfo = decoded.CfInfo;

      const accountResult = await axios.get('/account');
      data.accountInfo = accountResult.data.AccountInfo;

      const narResult = await axios.get('/nar');
      data.nar = narResult.data.Nar;

      const chartResult = await axios.get('/chart-info');
      if (chartResult.data.ProductInfoResult.Status.Code === '0') {
        const rankInfo = chartResult.data.RankInfoResult.RankInfo ? chartResult.data.RankInfoResult.RankInfo.valInfo : [];
        const termInfo = chartResult.data.TermInfoResult.TermInfo ? chartResult.data.TermInfoResult.TermInfo.valInfo : [];
        const productInfo = chartResult.data.ProductInfoResult.ProductInfo ? chartResult.data.ProductInfoResult.ProductInfo.Info : [];

        const rank = rankInfo.map(item => { return { Val: item.Val, Amount: item.Amount } });
        const term = termInfo.map(item => { return { Val: item.Val, Amount: item.Amount } });
        const product = productInfo.map(item => { return { Val: item.Val, Amount: item.Amount } });

        const chartRank = {
          labels: rank.map(item => item.Val),
          datasets: [{
            label: "Theo hạng khách hàng",
            backgroundColor: '#0098FF',
            hoverBackgroundColor: '#00007A',
            hoverBorderColor: '#B2E4FF',
            barThickness: 20,
            data: rank.map(item => (item.Amount)),
          }],
        }
        const chartTerm = {
          labels: term.map(item => item.Val),
          datasets: [{
            label: "Theo thời gian đầu tư còn lại",
            backgroundColor: '#0098FF',
            hoverBackgroundColor: '#00007A',
            hoverBorderColor: '#B2E4FF',
            barThickness: 20,
            data: term.map(item => (item.Amount)),
          }]
        }
        const chartProduct = {
          labels: product.map(item => item.Val),
          datasets: [{
            label: "Theo sản phẩm",
            backgroundColor: '#0098FF',
            hoverBackgroundColor: '#00007A',
            hoverBorderColor: '#B2E4FF',
            barThickness: 20,
            data: product.map(item => (item.Amount)),
          }]
        }
        data.chartRank = chartRank;
        data.chartTerm = chartTerm;
        data.chartProduct = chartProduct;
      } else {
        throw chartResult.data.ProductInfoResult.Status.Message;
      };

      setState({ ...data });
      setLoading(false);
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
      width: '80%',
      margin: '0 auto',
      borderStyle: 'none'
    },
    chart: {
      borderStyle: 'none',
      backgroundColor: 'none'
    },
    col: {
      borderRadius: 10,
    },
    header: {
      paddingLeft: 0,
    },
    headerInfo: {
      marginTop: -45,
      marginLeft: 150,
      fontWeight: 'bold'
    },
    chart: {
      backgroundColor: 'none',
      borderStyle: 'none'
    },
    chartOptions: {
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#0098FF',
          fontSize: 16,
          boxWidth: 0
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false
          },
        }],
        yAxes: [{
          ticks: {
            autoSkip: true,
            autoSkipPadding: 65,
            callback: function (value) {
              return numberWithCommas(value);
            },
          },
        }]
      }
    }
  }

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục"
        style={style.header}
      />
      <Descriptions column={1} style={style.headerInfo} className="category-dashboard-header">
        <Descriptions.Item label="· Hạng thành viên">{state.cfInfo.CustClass || '-'}</Descriptions.Item>
        <Descriptions.Item label="· Số điểm hiện tại">{state.accountInfo.Point || '0'}</Descriptions.Item>
      </Descriptions>

      <Card loading={loading} style={style.info} className="category-dashboard">
        <Row>
          <Col span={11} style={style.col}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Tổng tài sản">{state.accountInfo.TotalAsset ? numberWithCommas(state.accountInfo.TotalAsset) + ' VND' : '-'}</Descriptions.Item>
              <Descriptions.Item label="Số dư có thể đầu tư">{state.accountInfo.TotalAsset && numberWithCommas(state?.accountInfo.AvlAmt) + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Số dư đã đầu tư">{state.accountInfo.TotalAsset && numberWithCommas(state?.accountInfo.Invested) + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Số dư chờ khớp lệnh">{state.accountInfo.TotalAsset && numberWithCommas(state?.accountInfo.BlockAmt) + 'VND'}</Descriptions.Item>
            </Descriptions>
          </Col>
          <Col offset={2} span={11} style={style.col}>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Khoản đầu tư">{state.accountInfo.numInvest ?? '-'}</Descriptions.Item>
              <Descriptions.Item label="Thu thập ròng">{state.accountInfo.TotalAsset && numberWithCommas(state?.accountInfo.EstProfit) + ' VND'}</Descriptions.Item>
              <Descriptions.Item label="Tỷ suất sinh lời bình quân">{state.nar + '%'}</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Card>

      <Card loading={loading} style={style.chart} className="mt-3">
        <Row>
          <Col span={7} offset={1}>
            <Bar
              height={280}
              data={state.chartRank}
              options={style.chartOptions}
            />
          </Col>
          <Col span={7} offset={1}>
            <Bar
              height={280}
              data={state.chartTerm}
              options={style.chartOptions}
            />
          </Col>
          <Col span={7} offset={1}>
            <Bar
              height={280}
              data={state.chartProduct}
              options={style.chartOptions}
            />
          </Col>

        </Row>
      </Card>
    </MainLayout>
  )
}
