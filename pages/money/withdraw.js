import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Input, Select, Button, Form } from 'antd';
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

  const onFinish = async (values) => {
    try {
      const decoded = jwt.decode(Cookies.get('access_token'));
      const body = {
        header: {
          Sessionid: decoded.CfInfo.SessionID,
          Password: values.Password,
        },
        NewPassword: values.NewPassword,
      };

      const { data } = await axios.post("/changePassword", body);
      if (data.Status.Code !== '0') {
        console.log(data.Status.Message);
      } else {
        console.log('Congratulations! Your password has been changed successfully!');
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Rút tiền"
        style={{ paddingLeft: 0 }}
      />

      <Form
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nhập số tiền cần bán"
          name="Money"
          rules={[
            {
              required: true,
              message: 'Bạn cần nhập giá trị',
            },
          ]}
        >
          <Input.Number suffix="VND" />
        </Form.Item>
      </Form>
      <div className="mt-5">
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
