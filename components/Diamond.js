import axios from '@configs/api-request';
import { Card, Form, Input, Button, Select, notification } from 'antd';
import { useEffect, useState } from 'react';

function card() {
  const [user, setuser] = useState({});
  const [diamond, setDiamond] = useState(90);
  const [isLoading, setIsLoading] = useState(true);

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = async (values) => {
    try {
      const res = await axios.post('/diamondDraw', {
        ...values,
        diamond: diamond
      });

      form.resetFields();
    } catch (e) {
      console.log(e)
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onChangeValue = (value) => {
    setDiamond(value);
  }

  const style = {
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

  const fetch = async () => {
    try {
      const res = await axios.get(`/user/getUser`);
      setuser(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => { fetch() }, []);

  return (
    <Card
      style={{ width: '70%', marginTop: 100, margin: 'auto', textAlign: 'center' }}
      title="Rút kim cương"
      loading={isLoading}
      className="diamond-card"
    >
      <Form
        {...layout}
        form={form}
        style={style.form}
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Số lượng kim cương"
        >
          <Input disabled size="large" defaultValue={user.diamond} />
        </Form.Item>
        <Form.Item
          label="Tên ingame"
          name="idGame"
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Kim cương cần rút"
          name="diamond"
        >
          <Select defaultValue={90} name="cardValue" size="large" onChange={onChangeValue}>
            <Select.Option value={90} key={'1'}>90 kim cương</Select.Option>
            <Select.Option value={230} key={'2'}>230 kim cương</Select.Option>
            <Select.Option value={465} key={'3'}>465 kim cương</Select.Option>
            <Select.Option value={950} key={'4'}>950 kim cương</Select.Option>
            <Select.Option value={2750} key={'5'}>2750 kim cương</Select.Option>
            <Select.Option value={9999} key={'6'}>9999 kim cương</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Nội dung"
          name="content"
        >
          <Input size="large" />
        </Form.Item>
        <Button style={style.btnSubmit} type="primary" htmlType="submit">Yêu cầu rút kim cương</Button>
      </Form>
    </Card>
  );
}

export default card;
