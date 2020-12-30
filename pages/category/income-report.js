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
      title: 'Tháng hiện tại',
      dataIndex: 'month',
      key: 'month',
    }
  ];
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const allInfoResult = await axios.get('/all-income-report');
      const allInfo = allInfoResult.data.IncomeInfo;

      const params = {
        FromDate: moment().startOf('month').format('YYYY-MM-DD').toString(),
        ToDate: moment().format('YYYY-MM-DD').toString(),
      }
      const monthInfoResult = await axios.get('/income-by-time', { params });
      const monthInfo = monthInfoResult.data.IncomeInfo;

      const calculatedAll = {
        income: +allInfo.profits - +allInfo.namt - +allInfo.amountOvd + +allInfo.ReCommission,
        allFee: +allInfo.fee + +allInfo.tax
      }

      const calculatedMonth = {
        income: +monthInfo.profits - +monthInfo.namt - +monthInfo.namt + +monthInfo.ReCommission + +monthInfo.amountOvd,
        allFee: +monthInfo.fee + +monthInfo.tax,
      }

      const dataTable = [
        { key: 'Thu nhập', all: calculatedAll.income, month: calculatedMonth.income },
        { key: 'Lợi tức đã nhận', all: allInfo.profits, month: monthInfo.profits },
        { key: 'Phạt thanh toán trước hạn', all: allInfo.namt, month: monthInfo.namt },
        { key: 'Phạt chậm trả', all: allInfo.amountOvd, month: monthInfo.amountOvd },
        { key: 'Hoa hồng', all: allInfo.ReCommission, month: monthInfo.ReCommission },
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

      setData(dataTable);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
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
        pagination={false}
        loading={loading}
        dataSource={data}
        columns={columns}
      />
    </MainLayout>
  )
}
