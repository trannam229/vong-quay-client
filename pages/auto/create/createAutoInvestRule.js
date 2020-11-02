import MainLayout from '@layouts/main'
import { PageHeader, Card, Input, Select, Button, Form, Row, Col } from 'antd';
import { useRouter } from 'next/router'
import axios from '../../../configs/api-request';

export default function createAutoInvestRule() {
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

  const descriptionCustType = [
    {
      desc:'Doanh nghiệp',
      value:'DN'
    },
    {
      desc:'Hộ kinh doanh',
      value:'HKD'
    },
    {
      desc:'Cá nhân',
      value:'CN'
    },
    
  ];

  const descriptionSector = [
    {
      desc:'Chọn tất cả',
      value:'1'
    },
    {
      desc:'Thời trang, Phụ kiện, Trang sức',
      value:'2'
    },
    {
      desc:'Thực phẩm, Nhà hàng, Ăn uống',
      value:'3'
    }
    
  ];

  const descriptionSurplus = [
    {
      desc:'Có',
      value:'1'
    },
    {
      desc:'Không',
      value:'0'
    }
    
    
  ];
  const descriptionOptionCustType = descriptionCustType.map(des => (<Select.Option value={des.value}>{des.desc}</Select.Option>))
  const descriptionOptionSector = descriptionSector.map(des =>  (<Select.Option value={des.value}>{des.desc}</Select.Option>))
  const descriptionOptionSurplus = descriptionSurplus.map(des => (<Select.Option value={des.value}>{des.desc}</Select.Option>))
  const route = useRouter();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/create-auto-invest-rule", { param: values });
      console.log(data);
      if (data.Status.Code !== '0') {
        alert(data.Status.Message);
      } else {
        route.push({ pathname: '/' })
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
        title="Cài đặt"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: '100%', textAlign: "center" }}>
        <Form
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row>
            <Col span="11" >
              <Form.Item
                label="Chọn loại khách hàng"
                name="loaiKhachHang"
              >
                <Select style={style.selectInput}>
                  {descriptionOptionCustType}
                </Select>
              </Form.Item>
            </Col>
            <Col span="11">
              <Form.Item
                label="Chọn ngành nghề"
                name="chonNganhNghe"
              >
                <Select style={style.selectInput}>
                  {descriptionOptionSector}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span="11">
              <Form.Item
                title="Hạn mức tối đa theo số tiền đầu tư"
                label="Nhập số tiền tối thiểu"
                name="soTienToiThieu"
              >
                <Input suffix="VND" />
              </Form.Item>
            </Col>
            <Col span="11">
              <Form.Item
                label="Nhập số tiền tối đa"
                name="soTienToiDa"
              >
                <Input suffix="VND" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span="11">
              <Form.Item
                label="Sử dụng hết số dư"
                name="suDungHetSoDu"
              >
                <Select style={style.selectInput}>
                  {descriptionOptionSurplus}
                </Select>
              </Form.Item>
            </Col>

            <Col span="11">
              <Form.Item
                label="Hạn mức tối đa theo người gọi vốn"
                name="hanMucToiDaTheoNguoiGoiVon"
              >
                <Input suffix="VND" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span="4">
              <Form.Item
                label="Từ"
                name="kiHanDauTuTu"
              >
                <Input suffix="tháng" />
              </Form.Item>
            </Col>

            <Col span="4" style={{ marginLeft: '5%' }}>
              <Form.Item
                lable="Đến"
                name="kiHanDauTuDen" >
                <Input suffix="tháng" />
              </Form.Item>
            </Col>
            <Col span="4" style={{ marginLeft: '5%' }}>
              <Form.Item
                lable="Từ"
                name="loiTucDauTuTu" >
                <Input suffix="%" />
              </Form.Item>
            </Col>
            <Col span="5" style={{ marginLeft: '5%' }}>
              <label style={{  float:'left', textAlign:'center' ,margin:'5%'}}> Đến</label>
              <Form.Item
                name="loiTucDauTuDen" >
                <Input suffix="%" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              style={style.submitButton}
            >
              Lưu
              </Button>
          </Form.Item>

        </Form>
      </Card>
    </MainLayout>
  )
}
