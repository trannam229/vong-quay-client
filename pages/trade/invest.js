import MainLayout from '@layouts/main';
import { useEffect } from 'react';
import axios from '../../configs/api-request';
import { Table } from 'antd';
import { get } from 'lodash';


const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  

export default function Example() {
    useEffect(() => {
        const fetchData = async () => {
            const { data: dellToSell } = await axios.get("/deal-to-sell");
            const { data: priceBoard } = await axios.get("/price-board");
            const dataDellToSell = get(dellToSell, ['GetDealToSellResult', 'DealInfoList', 'DealInfo'], []);
            const dataPriceBoard = get(priceBoard, ['GetPriceBoardResult', 'PriceBoardList', 'PriceBoard'], []);
            console.log(dataPriceBoard.concat(dataDellToSell));
            console.log(dataPriceBoard);
            console.log(dataDellToSell);
        }

        fetchData();
    }, []);

    return (
        <MainLayout>
            <Table dataSource={dataSource} columns={columns} />;

        </MainLayout>
    )
}
