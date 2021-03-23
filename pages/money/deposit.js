import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Card, Select } from 'antd';

export default function Example() {
  const style = {
    header: {
      paddingLeft: 0,
      paddingTop: 0
    },
    info: {
      border: '2px #339ffe solid',
    },
    label: {
      color: '#2b9cfe',
      fontSize: 18
    },
    card: {
      width: '80%',
      margin: '0 auto',
      border: 'unset'
    }
  }
  const descriptionCustType = [
    {
      id: 1,
      name: 'Ngân hàng TMCP Xăng dầu Petrolimex (PG Bank) - Chi nhánh Thăng Long'
    },
    {
      id: 2,
      name: 'Ngân hàng TMCP Ngoại Thương Việt Nam (VCB) - Chi nhánh Tây Hà Nội'
    },{
      id: 3,
      name: 'Ngân hàng TMCP Kỹ Thương Việt Nam (TCB) - Chi nhánh Đông Đô'
    },{
      id: 4,
      name: 'Ngân hàng Đầu Tư và Phát Triển Việt Nam (BIDV) - Chi nhánh Đống Đa'
    },{
      id: 5,
      name: 'Ngân hàng TMCP Công Thương Việt Nam (VIETTIN) - Chi nhánh Tây Hà Nội'
    }
  ];
  const descriptionOptionCustType = descriptionCustType.map(des => (<Select.Option value={des.id} key={des.id}>{des.name}</Select.Option>))

  return (
    <MainLayout>
      <Card style={style.card}>
      <PageHeader
        className="site-page-header"
        title="Nộp tiền"
        style={style.header}
      />
        <div>
          <p className="font-weight-bold">Hướng dẫn nộp tiền đầu tư</p>
          <p>Bạn chuyển số tiền cần đầu tư vào tài khoản của Lendbiz với nội dung sau:</p>
        </div>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Số tài khoản</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>1237040197629</Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Chủ tài khoản</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>Công ty CP Lendbiz</Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Mở tại</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>Ngân hàng TMCP Xăng dầu Petrolimex (PG Bank) - Chi nhánh Thăng Long</Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Nội dung</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>Chuyển vào tài khoản &lt;SĐT của bạn&gt; mở tại Lendbiz</Col>
        </Row>
      </Card>
    </MainLayout>
  )
}
