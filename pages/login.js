import axios from '../configs/api-request';
import {Card, Form, Input, Button} from 'antd';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import {useRouter} from 'next/router'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 8},
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};


function login() {
    const route = useRouter();
    const onFinish = async (values) => {
        try {
            const {data} = await axios.post("/login", {header: values});
            if (data.Status.Code !== '0') {
                console.log('Login failed!');
            } else {
                const jwtAccount = jwt.sign(Object.assign(data, {Password: values.Password}), 'secretKey');
                Cookies.set('access_token', jwtAccount)
                route.push({pathname: '/category/dashboard'})
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="pt-5">
            <Card title="Login form"  style={{width: '50%', 'margin-top': '100px', margin: 'auto'}}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="Username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="Password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>

    );
}

export default login;