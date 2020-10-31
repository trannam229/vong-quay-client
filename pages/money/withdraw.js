import MainLayout from '@layouts/main'
import { PageHeader, Card, Input, Select, Button, Form } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';

export default function Withdraw() {
  const style = {
    label: {
      color: '#00007A'
    },
    submitButton: {
      width: '100px'
    },
    selectInput: {
      width: '100%'
    }
  };

  const bankList = [
    {
      id: 'Tpbank',
      name: 'NH Tiên Phong'
    },
    {
      id: 'Vietinbank',
      name: 'NH Vietinbank'
    },
    {
      id: 'HSBC',
      name: 'NH HSBC'
    }
  ];

  const bankListOptions = bankList.map((bank) =>
    (<Select.Option value={bank.id}>{bank.name}</Select.Option>)
  );

  const [state, setState] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/bank-account");
        if (data.Status.Code === '0') {
          setState({
            bankList: data.BankAccountList ? data.BankAccountList.BankAccount : [],
          })
        } else {
          console.log(data);
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchData();
  });

  const onFinish = (values) => {
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Rút tiền"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: 450, textAlign: "center" }}>

        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nhập số tiền cần bán"
            name="Money"
          >
            <Input suffix="VND" />
          </Form.Item>

          <Form.Item
            label="Chọn tài khoản ngân hàng"
            name="BankAccount"
          >
            <Select style={style.selectInput}>
              {bankListOptions}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tên ngân hàng chuyển"
            name="BankName"
          >
            <Select style={style.selectInput}>
              {bankListOptions}
            </Select>
          </Form.Item>

          <Form.Item
            label="Lý do muốn rút tiền"
            name="Description"
          >
            <Select style={style.selectInput}>
              {bankListOptions}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              style={style.submitButton}
            >
              Rút tiền
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  )
}
