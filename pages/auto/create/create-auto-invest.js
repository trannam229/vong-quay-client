import MainLayout from '@layouts/main'
import { PageHeader, Card, Input, Select, Button, Form, Row, Col, Switch } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../../configs/api-request';

export default function createAutoInvestRule() {
  const [sectors, setSectors] = useState([]);
  const [onOff, setOnOff] = useState(false);
  const [loading, setLoading] = useState(true);
  const [switchLoading, setSwitchLoading] = useState(true);
  const [autoInvest, setAutoInvest] = useState(null);

  const getAutoInvest = async () => {
    try {
      const autoInvests = await axios.get("/get-auto-invests");
      const autoInvest = (autoInvests.data.AutoInvestList)
        ? autoInvests.data.AutoInvestList.AutoInvestInfo.slice(-1)[0]
        : null;
      return autoInvest;
    } catch (e) {
      console.log(e)
    }
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      setSwitchLoading(true);
      const sectorsResult = await axios.get('/sectors');
      const sectors = sectorsResult.data.Sectors.SectorInfo;
      setSectors(sectors);

      const autoInvest = await getAutoInvest();
      setAutoInvest(autoInvest);
      if(autoInvest && autoInvest.Status === 'A') {
        setOnOff(true)
      }
      setLoading(false);
      setSwitchLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const switchButton = async () => {
    try {
      setOnOff(!onOff);
      setLoading(true);
      const autoInvest = await getAutoInvest();
      setAutoInvest(autoInvest);
      if (onOff === true && autoInvest && autoInvest.Status === 'A') {
        await axios.post("/update-auto-invest", { param: { ...autoInvest, Id: autoInvest.ID, Status: 'C'} });
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const onFinish = async (values) => {
    try {
      const autoInvest = await getAutoInvest();
      if (autoInvest) {
        values.Id = autoInvest.ID;
        values.Status = 'A';
        await axios.post("/update-auto-invest", { param: values });
      } else {
        await axios.post("/create-auto-invest", { param: values });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const descriptionCustType = [
    {
      desc: 'Doanh nghiệp',
      value: 'DN'
    },
    {
      desc: 'Hộ kinh doanh',
      value: 'HKD'
    },
    {
      desc: 'Cá nhân',
      value: 'CN'
    },
  ];
  const descriptionSurplus = [
    {
      desc: 'Có',
      value: '1'
    },
    {
      desc: 'Không',
      value: '0'
    }
  ];
  const descriptionOptionSector = sectors.map(item => (<Select.Option value={item.Val} key={item.Val}>{item.Content}</Select.Option>))
  const descriptionOptionCustType = descriptionCustType.map(des => (<Select.Option value={des.value} key={des.value}>{des.desc}</Select.Option>))
  const descriptionOptionSurplus = descriptionSurplus.map(des => (<Select.Option value={des.value} key={des.value}>{des.desc}</Select.Option>))

  const style = {
    label: {
      color: '#00007A'
    },
    submitButton: {
      width: '100px'
    },
    selectInput: {
      width: '100%',
      textAlign: 'left'
    }
  };

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Cài đặt"
        style={{ paddingLeft: 0 }}
      />
      <Card className="create-auto-invest-switch" bordered={false} loading={switchLoading}>
        <Form>
          <Form.Item
            label="Cài đặt đầu tư tự động"
            wrapperCol={{ span: 8 }}
            style={{ fontWeight: "bold" }}
          >
            <Switch onClick={switchButton} defaultChecked={onOff} />
          </Form.Item>
        </Form>
      </Card>
      
      {onOff ? <Card className="create-auto-invest-form" loading={loading} bordered={false} style={{ width: '100%', textAlign: "center" }}>
        <Form
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            CustType: autoInvest.CustType,
            Sector: autoInvest.Sector,
            MinAmt: autoInvest.MinAmt || 0,
            MaxAmt: autoInvest.MaxAmt || 0,
            ExhaustBalance: autoInvest.ExhaustBalance || 0,
            MaxPercent: autoInvest.MaxPercent || 0,
            MinTerm: autoInvest.MinTerm || 0,
            MaxTerm: autoInvest.MaxTerm || 0,
            MinRate: autoInvest.MinRate || 0,
            MaxRate: autoInvest.MaxRate || 0
          }}
        >
          <Row gutter={48, 48}>
            <Col span="12">
              <Form.Item
                label="Chọn loại khách hàng"
                name="CustType"
              >
                <Select style={style.selectInput}>
                  {descriptionOptionCustType}
                </Select>
              </Form.Item>
              <Form.Item
                title="Hạn mức tối đa theo số tiền đầu tư"
                label="Nhập số tiền tối thiểu"
                name="MinAmt"
              >
                <Input type="number" suffix="VND" />
              </Form.Item>
              <Form.Item
                label="Sử dụng hết số dư"
                name="ExhaustBalance"
              >
                <Select style={style.selectInput}>
                  {descriptionOptionSurplus}
                </Select>
              </Form.Item>
            </Col>
            <Col span="12">
              <Form.Item
                label="Chọn ngành nghề"
                name="Sector"
              >
                <Select style={style.selectInput}>
                  {descriptionOptionSector}
                </Select>
              </Form.Item>
              <Form.Item
                label="Nhập số tiền tối đa"
                name="MaxAmt"
              >
                <Input type="number" suffix="VND" />
              </Form.Item>
              <Form.Item
                label="Hạn mức tối đa trên doanh nghiệp gọi vốn"
                name="MaxPercent"
              >
                <Input type="number" suffix="%" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[48, 48]} className="mb-0">
            <Col span="12">
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }} label="Cài đặt kì hạn đầu tư" >
                <Row>
                  <Col span={12} className="pr-3">
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 19 }}
                      label="Từ"
                      labelAlign="left"
                      name="MinTerm"
                    >
                      <Input type="number" suffix="tháng" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="pl-3">
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 19 }}
                      label="Đến"
                      labelAlign="left"
                      name="MaxTerm" >
                      <Input type="number" suffix="tháng" />
                    </Form.Item>
                  </Col></Row>
              </Form.Item>
            </Col>
            <Col span="12" >
              <Form.Item
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }} label="Cài đặt Lợi tức đầu tư" >
                <Row>
                  <Col span={12} className="pr-3">
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 19 }}
                      labelAlign="left"
                      label="Từ"
                      name="MinRate" >
                      <Input type="number" suffix="%" />
                    </Form.Item>
                  </Col>
                  <Col span={12} className="pl-3">
                    <Form.Item
                      labelCol={{ span: 5 }}
                      wrapperCol={{ span: 19 }}
                      labelAlign="left"
                      label="Đến"
                      name="MaxRate" >
                      <Input type="number" suffix="%" />
                    </Form.Item>
                  </Col>
                </Row>
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
        : ''}

    </MainLayout>
  )
}
