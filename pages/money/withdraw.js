import MainLayout from '@/layouts/main'
import { PageHeader, Row, Col, Input, Select, Button } from 'antd';
const { Option } = Select;

export default function Example() {
  const style = {
    label: {
      color: '#00007A'
    },
    submitButton: {
      width: '100px'
    },
    selectInput: {
      width: '100%'
    }
  };

  const bankList = [
    {
      id: 'Tpbank',
      name: 'NH Tiên Phong'
    },
    {
      id: 'Vietinbank',
      name: 'NH Vietinbank'
    },
    {
      id: 'HSBC',
      name: 'NH HSBC'
    }
  ];

  const bankListOptions = bankList.map((bank) =>
    (<Option value={bank.id}>{bank.name}</Option>)
  );

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Rút tiền"
        style={{ paddingLeft: 0 }}
      />

      <div class="mt-5">
        <Row className="mt-5 p-2">
          <Col span="6" className="font-weight-bold" style={style.label}>Nhập số tiền bán</Col>
          <Col span="8">
            <Input suffix="VND" />
          </Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2 font-weight-bold" style={style.label}>Chọn tài khoản ngân hàng</Col>
          <Col span="8">
            <Select style={style.selectInput}>
              {bankListOptions}
            </Select>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2 font-weight-bold" style={style.label}>Tên ngân hàng chuyển</Col>
          <Col span="8">
            <Select style={style.selectInput}>
              {bankListOptions}
            </Select>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2 font-weight-bold" style={style.label}>Lý do muốn rút tiền</Col>
          <Select style={style.selectInput}>
            {bankListOptions}
          </Select>
        </Row>

        <Row className="mt-5">
          <Col span="8" offset="6">
            <Button shape="round" style={style.submitButton}>Rút tiền</Button>
          </Col>
        </Row>

      </div>
    </MainLayout>
  )
}
