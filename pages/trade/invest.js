import MainLayout from '@layouts/main';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import { Table, Button } from 'antd';
import { get } from 'lodash';

const columns = [
  {
    title: 'Tên chiến dịch',
    dataIndex: 'ShortName',
    key: 'ShortName',
  },
  {
    title: 'Thông tin khách hàng',
    dataIndex: 'InfoURL',

    render: (item) => {
      return (
        <a href={item} target="_blank">Xem thông tin</a>);
    }
  },
  // {
  //   title: 'Loại KH',
  //   dataIndex: 'ShortName',
  //   key: 'ShortName',
  // },
  {
    title: 'Hạng',
    dataIndex: 'CustClass',
    key: 'CustClass',
  },
  {
    title: 'Kì hạn',
    dataIndex: 'Term',
    key: 'Term',
    render: (term) => {
      return <>{term} Tháng</>;
    }
  },
  {
    title: 'Lợi suất',
    dataIndex: 'Int',
    key: 'Int',
    render: (int) => {
      return <>{int}%</>
    }
  },
  {
    title: 'Ngành',
    dataIndex: 'Sector',
    key: 'Sector',
  },
  {
    title: 'Số tiền kêu gọi đầu tư',
    dataIndex: 'BRegAmt',
    key: 'BRegAmt',
  },
  {
    title: '% đã đầu tư',
    dataIndex: 'InvestedRate',
    key: 'InvestedRate',
    render: (investedRate) => {
      if (investedRate) {
        return <>{investedRate}%</>
      }
      return <>-</>
    }
  },
  {
    title: 'Số tiền có thể đầu tư',
    dataIndex: 'BRegRemain',
    key: 'BRegRemain',
  },
  {
    title: 'Trạng thái',
    dataIndex: 'OrderType',
    key: 'OrderType',
  },
  {
    title: '',
    key: 'action',
    render: (item) => {
      return <Button>Đầu tư ngay</Button>
    }
  },
];


export default function Example() {
  const [items, setItems] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const { data: dellToSell } = await axios.get("/deal-to-sell");
      const { data: priceBoard } = await axios.get("/price-board");
      const dataDellToSell = get(dellToSell, ['GetDealToSellResult', 'DealInfoList', 'DealInfo'], []);
      const dataPriceBoard = get(priceBoard, ['GetPriceBoardResult', 'PriceBoardList', 'PriceBoard'], []);
      setItems(dataPriceBoard.concat(dataDellToSell));
      
    }

    fetchData();
  }, []);

  return (
    <MainLayout>
      <Table dataSource={items} columns={columns} />;

    </MainLayout>
  )
}
