import MainLayout from '@layouts/main';
import axios from '../configs/api-request';
import { Form, Input, Button } from 'antd';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function Example() {
  const route = useRouter();
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/login", {header: values});
      if (data.Status.Code !== '0') {
        alert('Login failed!');
      } else {
        const jwtAccount = jwt.sign(Object.assign(data, { Password: values.Password }), 'secretKey');
        Cookies.set('access_token', jwtAccount)
        route.push({ pathname: '/' })
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const onFinishFailed = errorInfo => {
    alert('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
        </Button>
        </Form.Item>
      </Form>
    </MainLayout>
  );
}

export default Example;