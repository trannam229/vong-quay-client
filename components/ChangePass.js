import axios from '@configs/api-request';
import { Card, Form, Input, Button, Image, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function login() {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if(values.newPassword != values.rePassword) {
      notification.open({
        type: 'error',
        message: 'Đổi mật khẩu thất bại!',
        description: 'Xác nhận lại mật khẩu mới.',
      });
      return;
    }

    try {
      await axios.post('/user/changePassword', { newPassword: values.newPassword, oldPassword: values.oldPassword });
      form.resetFields();
    } catch (e) {
      console.log(e);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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
    }
  }

  return (
    <Card style={{ width: '70%', margin: 'auto', textAlign: 'center', border: 'none' }}>
      <Image preview={false} src="/key.svg" className="changepass-img" width={180} />
      <Form
        form={form}
        style={style.form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="oldPassword"
          rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu hiện tại" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu mới" />
        </Form.Item>
        <Form.Item
          name="rePassword"
          rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" />
        </Form.Item>

        <Form.Item>
          <Button style={style.btnSubmit} className="mt-3" type="primary" htmlType="submit">Đổi mật khẩu</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default login;
