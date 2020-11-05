import MainLayout from '@layouts/main';
import { PageHeader, Row, Col, Descriptions, Image } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';

export default function Example() {
  const [state, setState] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const decoded = jwt.decode(Cookies.get('access_token'));
        const { data } = await axios.get('/account');

        setState({
          cfInfo: decoded.CfInfo,
          accountInfo: data.AccountInfo,
        });
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
        title="Hạng thành viên"
        style={{ paddingLeft: 0 }}
      />
      <>
        <Descriptions title="Chương trình khách hàng thân thiết">
          <Descriptions.Item>Bạn sẽ nhận 1 điểm cho mỗi 100.000 VND tiền đầu tư. Hãy tận hưởng những ưu đãi theo chương trình.</Descriptions.Item>
        </Descriptions>

        <Row justify="center" className="mt-5">
          <Col
            span={12}
            style={{ border: "2px #A4EAFF solid", borderRadius: 30 }}
          >
            <Row>
              <Col flex="100px">
                <Image
                  width={100}
                  src="/medal.svg"
                />
              </Col>
              <Col flex="auto">
                <p>Hạng thành viên hiện tại</p>
                <Row style={{ borderBottom: "2px gray solid" }}>
                  <Col flex="70px" style={{ borderRight: "2px #A4EAFF solid" }}><p>{state.cfInfo && state.cfInfo.CustClass}</p></Col>
                  <Col flex="auto">{state.accountInfo && state.accountInfo.Invested} điểm</Col>
                </Row>
                <p>Hãy giành thêm 5.000 điểm để nâng lên hạng Bạc.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </>

      <div className="mt-5">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Hạng thành viên & Quyền lợi</p>
        <Row justify="space-between">
          <Col span={4} className="text-center">
            <Image src="/medal.svg" width={70} />
            <p className="font-weight-bold">ĐỒNG</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>
          </Col>
          <Col span={4} className="text-center">
            <Image src="/medal.svg" width={70} />
            <p className="font-weight-bold">BẠC</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>
          </Col>
          <Col span={4} className="text-center">
            <Image src="/medal.svg" width={70} />
            <p className="font-weight-bold">VÀNG</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>
          </Col>
          <Col span={4} className="text-center">
            <Image src="/medal.svg" width={70} />
            <p className="font-weight-bold">KIM CƯƠNG</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>

          </Col>
        </Row>
      </div>
    </MainLayout>
  )
}
