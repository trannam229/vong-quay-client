import React from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Row, Col } from 'antd';
import { useRouter } from 'next/router'

export default function LoggoutButton() {

    const router = useRouter()


    return (
        <Row justify="end">
            <Col>
                <Button icon={<LogoutOutlined />} onClick={() => router.push('/about')}>
                    Thoát
                </Button>
            </Col>
        </Row>
    );
}
