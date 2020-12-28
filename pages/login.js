import axios from '../configs/api-request';
import {Card, Form, Input, Button, notification, Image} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router'

function login() {
    const route = useRouter();
    const onFinish = async (values) => {
        try {
            const {data} = await axios.post("/login", {header: values});
            if (data.Status.Code !== '0') {
                console.log('Login failed!');
            } else {
                const jwtAccount = jwt.sign(Object.assign(data, {Password: values.Password}), 'secretKey');
                Cookies.set('access_token', jwtAccount);
                Cookies.set('account_name', data?.CfInfo?.FullName);
                route.push({pathname: '/category/dashboard'})
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const quenMatKhau = () => {
      const key = "forgot";
      const btn = (
        <Button type="primary" size="small" onClick={() => notification.close(key)}>
          OK
        </Button>
      );
    
      notification.open({
        message: 'Onlinetrading.lendbiz.vn cho biết',
        description: 'Quý khách vui lòng liên hệ theo số điện thoại tổng đài của Lendbiz: 024.7307.2686 để được hỗ trợ',
        key,
        btn,
        duration: 10000
      });
    }

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

    return (
        <div style={{paddingTop: 100}}>
            <Card style={{width: '40%', marginTop: 100, margin: 'auto', textAlign: 'center'}}>
                <Image src="/key.svg" className="changepass-img" width={180} />
                <Form
                    style={style.form}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="Username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input size="large" prefix={<UserOutlined />} placeholder="Tên đăng nhập"/>
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined />} placeholder="Mật khẩu"/>
                    </Form.Item>
                    <Form.Item style={style.formForgot}>
                        <a style={style.btnForgot} onClick={quenMatKhau}>Quên mật khẩu?</a>
                    </Form.Item>
                    <Form.Item>
                        <Button style={style.btnSubmit} type="primary" htmlType="submit">Đăng nhập</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
}

export default login;
