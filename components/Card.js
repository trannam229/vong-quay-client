import axios from '@configs/api-request';
import { Card, Form, Input, Button, Select, notification } from 'antd';
import { useEffect, useState } from 'react';

function card() {
  const [network, setNetwork] = useState('VTT');
  const [cardValue, setCardValue] = useState(50000);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const res = await axios.post('/card', {
        ...values,
        appId: localStorage.getItem('appId'),
        username: localStorage.getItem('username'),
        network: network,
        cardValue: cardValue
      });

      form.resetFields();
    } catch (e) {
      console.log(e)
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChangeNetwork = (value) => {
    console.log(value)
    setNetwork(value);
  }

  const onChangeValue = (value) => {
    setCardValue(value);
  }

  const style = {
    card: {
      width: '70%',
      marginTop: 100,
      margin: 'auto',
      textAlign: 'center'
    },
    form: {
      width: '100%',
      margin: '0 auto'
    },
    btnSubmit: {
      margin: '0 auto',
      display: 'block',
      borderRadius: '20px',
      paddingLeft: '20px',
      paddingRight: '20px',
      fontSize: '16px'
    },
    formForgot: {
      marginTop: '-20px'
    },
    btnForgot: {
      float: 'right',
      border: 'none',
    }
  }

  return (
    <Card
      style={style.card}
      title="Nạp thẻ ưu đãi"
      className="card-card"
    >
      <Form
        form={form}
        style={style.form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="network"
        >
          <Select defaultValue="VTT" name="network" size="large" onChange={onChangeNetwork}>
            <Select.Option value={'VTT'} key={'VTT'}>Viettel</Select.Option>
            <Select.Option value={'VMS'} key={'VMS'}>Mobifone</Select.Option>
            <Select.Option value={'VNP'} key={'VNP'}>Vinaphone</Select.Option>
            <Select.Option value={'VNM'} key={'VNM'}>Vietnam Mobile</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="cardValue"
        >
          <Select defaultValue={50000} name="cardValue" size="large" onChange={onChangeValue}>
            <Select.Option value={10000} key={'1'}>10,000</Select.Option>
            <Select.Option value={20000} key={'2'}>20,000</Select.Option>
            <Select.Option value={50000} key={'5'}>50,000</Select.Option>
            <Select.Option value={100000} key={'10'}>100,000</Select.Option>
            <Select.Option value={200000} key={'20'}>200,000</Select.Option>
            <Select.Option value={500000} key={'50'}>500,000</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="cardCode"
          rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
        >
          <Input size="large" placeholder="Mã thẻ nạp" />
        </Form.Item>
        <Form.Item
          name="cardSeri"
          rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
        >
          <Input size="large" placeholder="Số series thẻ nạp" />
        </Form.Item>
        <Form.Item>
          <Button style={style.btnSubmit} type="primary" htmlType="submit">Nạp thẻ</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default card;
