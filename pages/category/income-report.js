import MainLayout from '@layouts/main'
import { PageHeader, Table } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import moment from 'moment';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const columns = [
    {
      title: '',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Cộng dồn',
      dataIndex: 'all',
      key: 'all',
    },
    {
      title: 'Tháng',
      dataIndex: 'month',
      key: 'month',
    }
  ];

  const [state, setState] = useState({
    dataTable: [],
    loading: true
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = {
          loading: false
        };
        let allInfo;
        let monthInfo;

        const allInfoResult = await axios.get('/all-income-report');
        if (allInfoResult.data.Status.Code === '0') {
          allInfo = allInfoResult.data.IncomeInfo;
        } else {
          console.log(allInfoResult.data.Status.Message)
        }

        const params = {
          FromDate: moment().startOf('month').format('YYYY-MM-DD').toString(),
          ToDate: moment().format('YYYY-MM-DD').toString(),
        }
        const monthInfoResult = await axios.get('/income-by-time', { params });
        if (monthInfoResult.data.Status.Code === '0') {
          monthInfo = monthInfoResult.data.IncomeInfo;
        } else {
          console.log(ciResult.data.Status.Message)
        }
        const calculatedAll = {
          income: +allInfo.profits - +allInfo.namt - +allInfo.namt + +allInfo.ReCommission + +allInfo.amountOvd,
          allFee: +allInfo.fee + +allInfo.tax
        }

        const calculatedMonth = {
          income: +monthInfo.profits - +monthInfo.namt - +monthInfo.namt + +monthInfo.ReCommission + +monthInfo.amountOvd,
          allFee: +monthInfo.fee + +monthInfo.tax,
        }

        data.dataTable = [
          { key: 'Thu nhập', all: calculatedAll.income, month: calculatedMonth.income },
          { key: 'Lợi tức đã nhận', all: allInfo.profits, month: monthInfo.profits },
          { key: 'Phạt thanh toán trước hạn', all: allInfo.namt, month: monthInfo.namt },
          { key: 'Phạt chậm trả', all: allInfo.namt, month: monthInfo.namt },
          { key: 'Hoa hồng', all: allInfo.amountOvd, month: monthInfo.amountOvd },
          { key: 'Thưởng', all: allInfo.ReCommission, month: monthInfo.ReCommission },
          { key: 'Chi phí', all: calculatedAll.allFee, month: calculatedMonth.allFee },
          { key: 'Phí dịch vụ', all: allInfo.fee, month: monthInfo.fee },
          { key: 'Thuế TNCN', all: allInfo.tax, month: monthInfo.tax },
          { key: 'Thu nhập ròng', all: +calculatedAll.income - +calculatedAll.allFee, month: +calculatedMonth.income - +calculatedMonth.allFee }
        ].map(item => {
          return {
            key: item.key,
            all: numberWithCommas(item.all),
            month: numberWithCommas(item.month)
          };
        });

        setState(data)
      } catch (e) {
        console.log(e);
      }
    }

    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Báo cáo thu nhập"
        style={{ paddingLeft: 0 }}
      />
      <Table
        bordered="true"
        className="income-report"
        loading={state.loading}
        dataSource={state.dataTable}
        columns={columns}
      />
    </MainLayout>
  )
}
