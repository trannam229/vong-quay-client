import MainLayout from '@layouts/main'
import { PageHeader, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
  const columns = [
    {
      title: 'Số REF',
      dataIndex: 'ref',
      key: 'ref',
    },
    {
      title: 'Tài khoản nhận',
      dataIndex: 'accountNumber',
      key: 'accountNumber',
    },
    {
      title: 'Chủ tài khoản nhận',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Tại ngân hàng',
      key: 'bankName',
      dataIndex: 'bankName',
    },

    {
      title: 'Thời gian',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Số tiền',
      key: 'amount',
      dataIndex: 'amount',
    }
  ];

  const [state, setState] = useState({
    styleTable: {
      loading: true
    }
  });

  const setTableSource = item => {
    return {
      key: item.RN,
      ref: item.ReqID,
      accountNumber: item.AccountNumber,
      fullName: item.FullName,
      bankName: item.BankName,
      date: item.txDate,
      amount: item.Amt,
    };
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get('/transfer-money');
        setState({
          styleTable: {
            loading: false
          },
          transferMoneyList: data.TransferMoneyList ? data.TransferMoneyList.TransferMoney.filter(item => item.Status === 'Chờ duyệt').map(setTableSource) : [],
        });
      } catch (e) {
        console.log(e);
      };
    };
    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Lệnh chờ thanh toán"
        style={{ paddingLeft: 0 }}
      />

        <Table
          bordered="true"
          loading={state.styleTable.loading}
          dataSource={state.transferMoneyList}
          columns={columns}
        />
    </MainLayout>
  )
}
