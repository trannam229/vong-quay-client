import MainLayout from '@layouts/main'
import { PageHeader, Row, Col } from 'antd';

export default function Example() {
  const style = {
    info: {
      borderRadius: '20px',
      border: '2px #339ffe solid',
    },
    label: {
      color: '#2b9cfe',
      fontSize: 18
    }
  }
  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Nộp tiền"
        style={{ paddingLeft: 0 }}
      />

      <div>
        <p className="font-weight-bold">Hướng dẫn nộp tiền đầu tư</p>
        <p>Bạn chuyển số tiền cần đầu tư vào tài khoản của Lendbiz với nội dung sau:</p>
      </div>

      <Row className="mt-5">
        <Col span="4" className="p-2" style={style.label}>Số tài khoản</Col>
        <Col span="12" className="p-2 pl-4" style={style.info}>1237040197629</Col>
      </Row>

      <Row className="mt-5">
        <Col span="4" className="p-2" style={style.label}>Chủ tài khoản</Col>
        <Col span="12" className="p-2 pl-4" style={style.info}>Công ty CP Lendbiz</Col>
      </Row>

      <Row className="mt-5">
        <Col span="4" className="p-2" style={style.label}>Mở tại</Col>
        <Col span="12" className="p-2 pl-4" style={style.info}>Ngân hàng TMCP Xăng dầu Petrolimex (PG Bank) - Chi nhánh Thăng Long</Col>
      </Row>

      <Row className="mt-5">
        <Col span="4" className="p-2" style={style.label}>Nội dung</Col>
        <Col span="12" className="p-2 pl-4" style={style.info}>Chuyển vào tài khoản &lt;SĐT của bạn&gt; mở tại Lendbiz</Col>
      </Row>
    </MainLayout>
  )
}
