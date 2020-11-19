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

  const description = [
    'Không có cơ hội đầu tư',
    'Không thích các cơ hội đầu tư',
    'Rút vốn chi tiêu',
    'Đầu tư kênh khác',
    'Tỷ lệ nợ xấu cao',
    'Khác'
  ];
  const descriptionOption = description.map(des => (<Select.Option value={des}>{des}</Select.Option>))
  const [state, setState] = useState({});
  let bankAccountList = [];

  useEffect(() => {
    const getBankAccountList = bankAccount => (<Select.Option value={bankAccount.RN}>{bankAccount.AccountNumber}</Select.Option>);
    const getBankNameList = bankAccount => (<Select.Option value={bankAccount.RN}>{bankAccount.BankName}</Select.Option>);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/bank-account");
        bankAccountList = data.BankAccountList.BankAccount;
        setState({
          bankAccountList: data.BankAccountList.BankAccount,
          bankAccountOption: data.BankAccountList ? data.BankAccountList.BankAccount.map(getBankAccountList) : [],
          bankNameOption: data.BankAccountList ? data.BankAccountList.BankAccount.map(getBankNameList) : [],
        });
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchData();
  }, []);

  const onFinish = values => {
    if (values.bankAccount !== values.bankName) {
      //TODO
      return;
    };

    const transferMoney = async () => {
      try {
        const body = {
          pv_Amt: values.amount,
          pv_txDesc: values.description,
          BankAccount: state.bankAccountList.find(bankAccount => bankAccount.RN === values.bankAccount)
        };

        const { data } = await axios.post("/transfer-money", body);
        if (data.Status.Code !== '0') {
          console.log(data.Status.Message);
        } else {
          console.log('Congratulations! Your with draw was made!');
        }
      } catch (e) {
        console.log(e.message);
      }
    }

    transferMoney();
  }

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
      <Card style={{ width: '100%', textAlign: "center", margin: '0 auto' }}>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nhập số tiền cần bán"
            name="amount"
          >
            <Input suffix="VND" />
          </Form.Item>

          <Form.Item
            label="Chọn tài khoản ngân hàng"
            name="bankAccount"
          >
            <Select style={style.selectInput}>
              {state.bankAccountOption}
            </Select>
          </Form.Item>

          <Form.Item
            label="Tên ngân hàng chuyển"
            name="bankName"
          >
            <Select style={style.selectInput}>
              {state.bankNameOption}
            </Select>
          </Form.Item>

          <Form.Item
            label="Lý do muốn rút tiền"
            name="description"
          >
            <Select style={style.selectInput}>
              {descriptionOption}
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
