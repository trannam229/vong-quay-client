import MainLayout from '@layouts/main';
import { PageHeader, Card, Button, Form, Input } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

export default function Example() {
  return (
    <MainLayout>
      <PageHeader className="site-page-header"
        title="Đổi mật khẩu"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: 450, textAlign: "center" }}>
        <img src="/medal.svg" alt="Vercel Logo" className="logo" width="100px" />
        <Form layout="vertical">
          <Form.Item label="Mật khẩu hiện tại" required tooltip="This is a required field">
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            required
          >
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>

          <Form.Item
            label="Nhập lại mật khẩu mới"
            required
          >
            <Input.Password iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          </Form.Item>

          <Form.Item>
            <Button type="primary">Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  )
}
