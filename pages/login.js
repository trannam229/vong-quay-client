import axios from '@configs/api-request';
import { Card, Form, Input, Button, Image, notification } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, FontColorsOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function login() {
  const [tab, setTab] = useState({ key: 'tab1' });

  const route = useRouter();

  const onFinish = async (values) => {
    try {
      localStorage.setItem('appId', 1)
      localStorage.setItem('unit', 'kim cương');
    
      const res = await axios.post('/login', { ...values, appId: localStorage.getItem('appId') });
      Cookies.set('access-token', res.data.accessToken, { expires: 1 / 48 });
      localStorage.setItem('username', values.username)

      notification.open({
        type: 'success',
        message: 'Đăng nhập thành công!',
        description: `Chào mừng ${values.username}`,
      });

      route.push({ pathname: '/' })
    } catch (e) {
      notification.open({
        type: 'error',
        message: 'Đăng nhập thất bại!',
        description: 'Sai tên đăng nhập hoặc mật khẩu.',
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const quenMatKhau = () => {
    console.log('Quen mat khau')
  }

  const onFinishReg = async (values) => {
    try {
      const res = await axios.post('/user/register', { ...values, appId: localStorage.getItem('appId') });
      notification.open({
        type: 'success',
        message: 'Bạn đã đăng ký thành công!',
        description: `Hãy đăng nhập vào tài khoản bạn vừa đăng ký`,
      });

      setTab({ key: 'tab2' })
    } catch (e) {
      console.log(e);
    }
  };

  const style = {
    form: {
      width: '70%',
      margin: '0 auto'
    },
    btnSubmit: {
      margin: '0 auto',
      marginTop: '-16px',
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

//Handle 2 tabs
  const tabList = [
    {
      key: 'tab1',
      tab: 'Đăng nhập',
    },
    {
      key: 'tab2',
      tab: 'Đăng ký',
    },
  ];

  const contentList = {
    tab1: (
      <>
        <Image preview={false} src="/gun/bullet.png" className="changepass-img" width={180} />
        <Form
          style={style.form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item style={style.formForgot}>
            <a style={style.btnForgot} onClick={quenMatKhau}>Quên mật khẩu?</a>
          </Form.Item>
          <Form.Item>
            <Button style={style.btnSubmit} type="primary" htmlType="submit">Đăng nhập</Button>
          </Form.Item>
        </Form>
      </>
    ),
    tab2: (
      <>
        <Image preview={false} src="/key.svg" className="changepass-img" width={180} />
        <Form
          style={style.form}
          name="reg"
          initialValues={{ remember: true }}
          onFinish={onFinishReg}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="fullName"
          >
            <Input size="large" prefix={<FontColorsOutlined />} placeholder="Tên của bạn là" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Hãy nhập thông tin!' }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item>
            <Button style={style.btnSubmit} type="primary" htmlType="submit">Đăng ký</Button>
          </Form.Item>
        </Form>
      </>
    ),
  };

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };

  return (
    <Card
      style={{ width: '50%', marginTop: 100, margin: 'auto', textAlign: 'center' }}
      tabList={tabList}
      activeTabKey={tab.key}
      onTabChange={key => {onTabChange(key, 'key');}}
      className="login-card"
    >
      {contentList[tab.key]}
    </Card>
  );
}

export default login;
