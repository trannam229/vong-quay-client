import MainLayout from '@layouts/main'
import { PageHeader, Card, Input, Select, Button, Form, Row } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../../configs/api-request';

export default function createAutoInvestRule() {
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

  const descriptionCustType = [
    'Doanh nghiệp',
    'Hộ kinh doanh',
    'Cá nhân'
  ];

  const descriptionSector = [
    'Chọn tất cả',
    'Thời trang, Phụ kiện, Trang sức',
    'Thực phẩm, Nhà hàng, Ăn uống'
  ];

  const descriptionSurplus = [
    'Có',
    'Không'
  ];
  const descriptionOptionCustType = descriptionCustType.map(des => (<Select.Option value={des}>{des}</Select.Option>))
  const descriptionOptionSector = descriptionSector.map(des => (<Select.Option value={des}>{des}</Select.Option>))
  const descriptionOptionSurplus = descriptionSurplus.map(des => (<Select.Option value={des}>{des}</Select.Option>))
  const [state, setState] = useState({});
  let bankAccountList = [];

  useEffect(() => {
    const getBankAccountList = bankAccount => (<Select.Option value={bankAccount.RN}>{bankAccount.AccountNumber}</Select.Option>);
    const getBankNameList = bankAccount => (<Select.Option value={bankAccount.RN}>{bankAccount.BankName}</Select.Option>);
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/bank-account");
        if (data.Status.Code === '0') {
          bankAccountList = data.BankAccountList.BankAccount;
          setState({
            bankAccountList: data.BankAccountList.BankAccount,
            bankAccountOption: data.BankAccountList ? data.BankAccountList.BankAccount.map(getBankAccountList) : [],
            bankNameOption: data.BankAccountList ? data.BankAccountList.BankAccount.map(getBankNameList) : [],
          });
        } else {
          console.log(data);
        }
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
          pv_txDesc: values.descriptionCustType,
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
        title="Cài đặt"
        style={{ paddingLeft: 0 }}
      />
      <Card style={{ width: 950, textAlign: "center" }}>
        <Form
          layout="inline"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row justify="center" className="mt-5">
            <Form.Item
              label="Chọn loại khách hàng"
              name="descriptionCustType"
            >
              <Select style={style.selectInput}>
                {descriptionOptionCustType}
              </Select>
            </Form.Item>
            <Form.Item
              label="Chọn ngành nghề"
              name="bankAccount"
            >
              <Select style={style.selectInput}>
                {descriptionOptionSector}
              </Select>
            </Form.Item>
          </Row>
        </Form>
        <Form
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Chọn loại khách hàng"
            name="descriptionCustType"
          >
            <Select style={style.selectInput}>
              {descriptionOptionCustType}
            </Select>
          </Form.Item>

          <Form.Item
            label="Chọn ngành nghề"
            name="bankAccount"
          >
            <Select style={style.selectInput}>
              {descriptionOptionSector}
            </Select>
          </Form.Item>

          <Form.Item
            title="Hạn mức tối đa theo số tiền đầu tư"
            label="Nhập số tiền tối thiểu"
            name="bankName"
          >
            <Input suffix="VND" />
          </Form.Item>

          <Form.Item
            label="Nhập số tiền tối đa"
            name="bankName"
          >
            <Input suffix="VND" />
          </Form.Item>

          <Form.Item
            label="Sử dụng hết số dư"
            name="descriptionSurplus"
          >
            <Select style={style.selectInput}>
              {descriptionOptionSurplus}
            </Select>
          </Form.Item>

          <Form.Item
            label="Hạn mức tối đa theo người gọi vốn"
            name="bankName"
          >
            <Input suffix="VND" />
          </Form.Item>

          <Form.Item
            label="Cài đặt kì hạn đầu tư"
            name="bankName"
          >
            <span>Từ</span>
            <Input suffix="tháng" />
            <span>Đến</span>
            <Input suffix="tháng" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              style={style.submitButton}
            >
              Lưu
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </MainLayout>
  )
}
