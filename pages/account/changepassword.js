import MainLayout from '@layouts/main';
import { PageHeader, Card, Button, Form, Input, Image } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import axios from '../../configs/api-request';

export default function Example() {
  const onFinish = async (values) => {
    try {
      const body = {
        header: { Password: values.Password },
        NewPassword: values.NewPassword,
      };

      const { data } = await axios.post("/change-password", body);
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
      <PageHeader className="site-page-header"
        title="Đổi mật khẩu"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: 450, textAlign: "center" }}>
        <Image src="/medal.svg" width={100} />
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  )
}
