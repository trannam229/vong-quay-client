import MainLayout from '@layouts/main';
import { PageHeader, Row, Col, Descriptions, Image, Card } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';

export default function Example() {
  const [state, setState] = useState({
    loading: true
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const decoded = jwt.decode(Cookies.get('access_token'));
        const { data } = await axios.get('/account');

        setState({
          loading: false,
          cfInfo: decoded.CfInfo,
          accountInfo: data.AccountInfo,
        });
      } catch (e) {
        alert(e);
      }
    }

    fetchData();
  }, []);

  const style = {
    card: {
      borderRadius: 20,
      border: '2px #69c0ff solid',
      width: 650,
      margin: '20px auto',
    },
    custClass: {
      borderBottom: '2px gray solid',
      fontSize: 18,
      fontWeight: 550,
      color: '#69c0ff'
    },
    custClassText: {
      marginBottom: 7,
    },
    benefit: {
      borderRadius: 5,
      backgroundColor: 'white',
      padding: '15px 15px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
  };

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Hạng thành viên"
        style={{ paddingLeft: 0 }}
      />
      <Descriptions title="Chương trình khách hàng thân thiết">
        <Descriptions.Item>Bạn sẽ nhận 1 điểm cho mỗi 100.000 VND tiền đầu tư. Hãy tận hưởng những ưu đãi theo chương trình.</Descriptions.Item>
      </Descriptions>

      <Card style={style.card} loading={state.loading}>
        <Row>
          <Col flex="100px">
            <Image width={100} src={`/${state.cfInfo ? state.cfInfo.CustClass.toLowerCase() : 'medal'}.svg`} />
          </Col>
          <Col flex="auto">
            <p>Hạng thành viên hiện tại</p>
            <Row style={style.custClass}>
              <Col flex="80px" style={style.custClassText}>{state.cfInfo && state.cfInfo.CustClass}</Col>
              <Col style={style.custClassText}>|</Col>
              <Col flex="auto" style={style.custClassText}>{state.accountInfo && state.accountInfo.Invested} ĐIỂM</Col>
            </Row>
            <p>Hãy giành thêm 5.000 điểm để nâng lên hạng Bạc.</p>
          </Col>
        </Row>
      </Card>

      <p className="font-weight-bold" style={{ fontSize: '16px' }}>Hạng thành viên & Quyền lợi</p>
      <Row justify="space-between">
        <Col span={5} style={style.benefit}>
          <Image src="/bronze.svg" width={70} />
          <p className="font-weight-bold mt-2 mb-0">ĐỒNG</p>
          <p>Mặc định cho tất cả các nhà đầu tư</p>
          <ul>
            <li>Hỗ trợ Live Chat</li>
            <li>Đặt lệnh tự động</li>
          </ul>
        </Col>
        <Col span={5} style={style.benefit}>
          <Image src="/silver.svg" width={70} />
          <p className="font-weight-bold mt-2 mb-0">BẠC</p>
          <p>Mặc định cho tất cả các nhà đầu tư</p>
          <ul>
            <li>Hỗ trợ Live Chat</li>
            <li>Đặt lệnh tự động</li>
          </ul>
        </Col>
        <Col span={5} style={style.benefit}>
          <Image src="/gold.svg" width={70} />
          <p className="font-weight-bold mt-2 mb-0">VÀNG</p>
          <p>Mặc định cho tất cả các nhà đầu tư</p>
          <ul>
            <li>Hỗ trợ Live Chat</li>
            <li>Đặt lệnh tự động</li>
          </ul>
        </Col>
        <Col span={5} style={style.benefit}>
          <Image src="/medal.svg" width={70} />
          <p className="font-weight-bold mt-2 mb-0">KIM CƯƠNG</p>
          <p>Mặc định cho tất cả các nhà đầu tư</p>
          <ul>
            <li>Hỗ trợ Live Chat</li>
            <li>Đặt lệnh tự động</li>
          </ul>
        </Col>
      </Row>
    </MainLayout>
  )
}
