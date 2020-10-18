import MainLayout from '@layouts/main';
import axios from '../configs/api-request';
import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import jwt from 'jsonwebtoken';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function Example() {
  useEffect(() => {
    // const data = localStorage.getItem('_jwtAccount')
    // if (data) {
    //   this.setState(prevState => {
    //     return JSON.parse(data)
    //   })
    // }
  });

  const [state, setState] = useState([]);
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/login", values);
      if (data.Status.Code !== '0') {
        console.log('Login failed!');
      } else {
        const info = {
          CfInfo: data.CfInfo,
          AccountResults: data.AccountResults,
          values
        }
        const jwtAccount = jwt.sign(info, 'secretKey');
        localStorage.setItem('_jwtAccount', jwtAccount)
        const decoded = jwt.verify(jwtAccount, 'secretKey');
        console.log(decoded);
      }
    } catch (error) {
      console.log(error);
    }

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
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