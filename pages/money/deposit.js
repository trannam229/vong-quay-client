import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Card, Select } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
  const style = {
    header: {
      paddingLeft: 0,
      paddingTop: 0
    },
    info: {
      border: '2px #339ffe solid',
    },
    label: {
      color: '#2b9cfe',
      fontSize: 18
    },
    card: {
      width: '80%',
      margin: '0 auto',
      border: 'unset'
    }
  }

  const [banks, setBanks] = useState([]);
  const [bankScid, setBankScid] = useState('Vui lòng chọn ngân hàng phía dưới');
  const [bankAccount, setBankAccount] = useState('Vui lòng chọn ngân hàng phía dưới');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/bank-info');
        setBanks(data.Bankinfo.BankInfo)
      } catch (e) {
        console.log(e);
      };
    };
    fetchData();
  }, []);

  const handleChangeBank = (value) => {
    setBankScid(value);
    setBankAccount(banks.find(bank => bank.Scid === value).Receiver);
  }

  return (
    <MainLayout>
      <Card style={style.card}>
      <PageHeader
        className="site-page-header"
        title="Nộp tiền"
        style={style.header}
      />
        <div>
          <p className="font-weight-bold">Hướng dẫn nộp tiền đầu tư</p>
          <p>Bạn chuyển số tiền cần đầu tư vào tài khoản của Lendbiz với nội dung sau:</p>
        </div>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Số tài khoản</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>{bankScid}</Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Chủ tài khoản</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>{bankAccount}</Col>
        </Row>

        <Row className="mt-5 deposit-select-bank">
          <Col span="6" className="p-2" style={style.label}>Mở tại</Col>
          <Col span="16">
            <Select onChange={handleChangeBank}>
              {banks
              ? banks.map(bank => (<Select.Option value={bank.Scid} key={bank.Scid}>{bank.BankName}</Select.Option>))
              : (<Select.Option value={0} key={0}>No information</Select.Option>)}
            </Select>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col span="6" className="p-2" style={style.label}>Nội dung</Col>
          <Col span="16" className="p-2 pl-4" style={style.info}>Chuyển vào tài khoản &lt;SĐT của bạn&gt; mở tại Lendbiz</Col>
        </Row>
      </Card>
    </MainLayout>
  )
}
