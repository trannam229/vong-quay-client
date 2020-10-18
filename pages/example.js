import MainLayout from '@layouts/main';
import axios from '../configs/api-request';
import { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};


function Example() {
  const onFinish = async (values) => {
    try {
      const { data } = await axios.post("/login", values);
      console.log(data);
      if (data.Status.Code !== '0') {
        console.log('Login failed!');
      } else {
        const jwtAccount = jwt.sign(data.CfInfo, 'secretKey');
        Cookies.set('access_token', jwtAccount)
      }
    } catch (e) {
      console.log(e.message);
    }

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  return <MainLayout>
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
  );</MainLayout>
}

export default Example;