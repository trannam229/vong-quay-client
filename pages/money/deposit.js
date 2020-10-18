import MainLayout from '@layouts/main'
import { PageHeader, Row, Col } from 'antd';

export default function Example() {
  const styleInfo = {
    borderRadius: '10px',
    border: '2px #A4EAFF solid'
  }
  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Nộp tiền"
        style={{ paddingLeft: 0 }}
      />

      <div>
        <p class="font-weight-bold">Hướng dẫn nộp tiền đầu tư</p>
        <p>Bạn chuyển số tiền cần đầu tư vào tài khoản của Lendbiz với nội dung sau:</p>
      </div>

      <div class="mt-5">
        <Row className="mt-5">
          <Col span="4" className="p-2">Số tài khoản</Col>
          <Col span="10" className="p-2" style={styleInfo}>1237040197629</Col>
        </Row>

        <Row className="mt-5">
          <Col span="4" className="p-2">Chủ tài khoản</Col>
          <Col span="10" className="p-2" style={styleInfo}>Công ty CP Lendbiz</Col>
        </Row>

        <Row className="mt-5">
          <Col span="4" className="p-2">Mở tại</Col>
          <Col span="10" className="p-2" style={styleInfo}>Ngân hàng TMCP Xăng dầu Petrolimex (PG Bank) - Chi nhánh Thăng Long</Col>
        </Row>

        <Row className="mt-5">
          <Col span="4" className="p-2">Nội dung</Col>
          <Col span="10" className="p-2" style={styleInfo}>Chuyển vào tài khoản &lt;SĐT của bạn&gt mở tại Lendbiz</Col>
        </Row>
      </div>
    </MainLayout>
  )
}
