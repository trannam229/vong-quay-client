import { Card, Descriptions, Table } from 'antd';
import axios from '@configs/api-request';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import moment from 'moment';

export default function Example() {
  const [history, sethistory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    try {
      const res2 = await axios.get(`/history/findOne`);
      sethistory(res2.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Thời gian',
      dataIndex: 'createDate',
      key: 'createDate',
      sorter: (a, b) => a.createDate - b.createDate,
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
      render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss'),
    },
    {
      title: 'Miêu tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Số tiền',
      dataIndex: 'money',
      key: 'money',
      render: (data) => numberWithCommas(data),
      sorter: (a, b) => a.money - b.money,
      sortDirections: ['descend', 'ascend', 'descend'],
      defaultSortOrder: 'descend',
    },
  ];
  const style = {
    card: {
      width: '100%',
      border: 'none',
    }
  }

  useEffect(() => { fetch() }, []);
  return (
    <Card loading={isLoading} style={style.card} className="history-card" title="Lịch sử quay thưởng">
      <Table
        bordered="true"
        dataSource={history}
        columns={columns}
        pagination={{ defaultPageSize: 8 }}
      />
    </Card>
  )
}