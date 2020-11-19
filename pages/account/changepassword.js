import MainLayout from '@layouts/main';
import { Card, Button, Form, Input, Image } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from '../../configs/api-request';

export default function Example() {
  const onFinish = async (values) => {
    try {
      const body = {
        header: { Password: values.Password },
        NewPassword: values.NewPassword,
      };

      await axios.post("/change-password", body);
    } catch (e) {
      console.log(e.message);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const style = {
    button: {
      width: 150,
      height: 40,
      fontSize: 16
    },
    txt: {
      fontSize: 18
    },
    header: {
      textAlign: 'center'
    },
    card: {
      width: 450,
      textAlign: 'center',
      margin: '0 auto'
    }
  }

  return (
    <MainLayout>
      <h3 style={style.header}>Đổi mật khẩu</h3>
      <Card style={style.card} className="mt-4">
        <Image src="/key.svg" className="mt-3" width={100} />
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="mt-4"
        >
          <Form.Item
            label="Mật khẩu hiện tại"
            name="Password"
            rules={[
              {
                required: true,
                message: 'Bạn cần nhập giá trị',
              },
            ]}
          >
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="NewPassword"
            rules={[
              {
                required: true,
                message: 'Bạn cần nhập giá trị',
              },
            ]}
          >
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="ReNewPassword"
            dependencies={['NewPassword']}
            rules={[
              {
                required: true,
                message: 'Bạn cần nhập giá trị',
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('NewPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Hãy nhập đúng mật khẩu mới!');
                },
              }),
            ]}
          >
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" shape="round" style={style.button} htmlType="submit">Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  )
}
