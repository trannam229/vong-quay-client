import MainLayout from '@layouts/main'
import { PageHeader, Descriptions, Card } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';

export default function Example() {
  const [state, setState] = useState({
    cfInfo: {},
    accountInfo: {},
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
          console.log(accountResult.data.Status.Message)
        }

        const narResult = await axios.get('/nar');
        if (narResult.data.Status.Code === '0') {
          data.nar = narResult.data.Nar;
        } else {
          console.log(narResult.data.Status.Message)
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
        title="Danh mục"
        style={{ paddingLeft: 0 }}
      />
      <>
        <Descriptions column={1}>
          <Descriptions.Item label="Hạng thành viên">{state?.cfInfo?.CustClass ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="Số điểm hiện tại">{state?.accountInfo?.Invested ?? '-'}</Descriptions.Item>
        </Descriptions>

        <Card size="small" style={{ width: 1000, margin: '0 auto' }}>
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Tổng tài sản">{state?.accountInfo?.TotalAsset ? state?.accountInfo?.TotalAsset + ' VND' : '-'}</Descriptions.Item>
            <Descriptions.Item label="Khoản đầu tư">{state?.accountInfo?.BlockAmt ?? '-'}</Descriptions.Item>

            <Descriptions.Item label="Số dư có thể đầu tư">{state?.accountInfo?.AvlAmt + ' VND'}</Descriptions.Item>
            <Descriptions.Item label="Thu thập ròng">{state?.accountInfo?.EstProfit + ' VND'}</Descriptions.Item>

            <Descriptions.Item label="Số dư đã đầu tư">{state?.accountInfo?.Invested + ' VND'}</Descriptions.Item>
            <Descriptions.Item label="Tỷ suất sinh lời bình quân">{state?.nar + '%'}</Descriptions.Item>

            <Descriptions.Item label="Số dư chờ khớp lệnh">{state?.accountInfo?.BlockAmt}</Descriptions.Item>
          </Descriptions>
        </Card>
      </>
    </MainLayout>
  )
}
