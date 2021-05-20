import { Card, Descriptions, Table } from 'antd';
import axios from '@configs/api-request';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import moment from 'moment';

export default function Example() {
  const [user, setuser] = useState({});
  const [history, sethistory] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    try {
      const res = await axios.get(`/user/getUser`);
      setuser(res.data);
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
      render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss')
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
      render: (data) => numberWithCommas(data)
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
    <Card loading={isLoading} style={style.card} title="Thông tin cá nhân">
      <Descriptions column={4} bordered layout="vertical">
        <Descriptions.Item label="Tên đăng nhập">{user.username || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Tên đầy đủ">{user.fullName || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Ngày đăng ký">{moment(user.createDate).format('DD/MM/YYYY | HH:mm:ss') || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Số tiền đã nạp (VND)">{(numberWithCommas(user.amount) || 'Thông tin trống')}</Descriptions.Item>
        <Descriptions.Item label="Số tiền còn lại (VND)">{numberWithCommas(user.currentAmount) || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Tài sản (kim cương)">{numberWithCommas(user.diamond) || 'Thông tin trống'}</Descriptions.Item>
      </Descriptions>

      <Table
        className="mt-4"
        bordered="true"
        dataSource={history}
        columns={columns}
        pagination={{ defaultPageSize: 10 }}
      />
    </Card>
  )
}