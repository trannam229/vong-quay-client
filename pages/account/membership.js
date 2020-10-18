import MainLayout from '@layouts/main';
import { PageHeader, Row, Col } from 'antd';
import { useEffect } from 'react';
import jwt from 'jsonwebtoken';

export default function Example() {
  let data = {};
  useEffect(() => {
    const jwtAccount = localStorage.getItem('_jwtAccount')
    const account = jwt.verify(jwtAccount, 'secretKey');
    console.log(account);
    data.CfInfo = account.CfInfo;
  });

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Hạng thành viên"
        style={{ paddingLeft: 0 }}
      />

      <div>
        <p class="font-weight-bold">Chương trình khách hàng thân thiết</p>
        <p>Bạn sẽ nhận 1 điểm cho mỗi 100.000 VND tiền đầu tư. Hãy tận hưởng những ưu đãi theo chương trình.</p>
        <Row justify="center" class="mt-5">
          <Col
            span={12}
            style={{ border: "2px #A4EAFF solid", borderRadius: 30 }}
          >
            <Row>
              <Col flex="100px">
                <img src="/medal.svg" alt="Vercel Logo" className="logo" width="100px" />
              </Col>
              <Col flex="auto">
                <p>Hạng thành viên hiện tại</p>
                <Row style={{ borderBottom: "2px gray solid" }}>
                  <Col flex="70px" style={{ borderRight: "2px #A4EAFF solid" }}><p>{data.CfInfo.CfType}</p></Col>
                  <Col flex="auto">0 điểm</Col>
                </Row>
                <p>Hãy giành thêm 5.000 điểm để nâng lên hạng Bạc.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div class="mt-5">
        <p class="font-weight-bold">Hạng thành viên & Quyền lợi</p>
        <Row justify="space-between">
          <Col span={4} class="text-center">
            <img src="/medal.svg" alt="Vercel Logo" className="logo" width="70px" />
            <p class="font-weight-bold">ĐỒNG</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>
          </Col>
          <Col span={4} class="text-center">
            <img src="/medal.svg" alt="Vercel Logo" className="logo" width="70px" />
            <p class="font-weight-bold">BẠC</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>
          </Col>
          <Col span={4} class="text-center">
            <img src="/medal.svg" alt="Vercel Logo" className="logo" width="70px" />
            <p class="font-weight-bold">VÀNG</p>
            <p>Mặc định cho tất cả các nhà đầu tư</p>
            <ul>
              <li>Hỗ trợ Live Chat</li>
              <li>Đặt lệnh tự động</li>
            </ul>
          </Col>
          <Col span={4} class="text-center">
            <img src="/medal.svg" alt="Vercel Logo" className="logo" width="70px" />
            <p class="font-weight-bold">KIM CƯƠNG</p>
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
