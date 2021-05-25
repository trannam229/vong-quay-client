import { Card, Descriptions, Image } from 'antd';
import axios from '@configs/api-request';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const [user, setuser] = useState({});
  const [char, setChar] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetch = async () => {
    setChar(Math.floor(Math.random() * 10));

    try {
      const res = await axios.get(`/user/getUser`);
      setuser(res.data);
      setIsLoading(false);
    } catch (e) {
      console.log(e)
    }
  }
  const style = {
    card: {
      width: '100%',
      border: 'none',
    }
  }
  useEffect(() => { fetch() }, []);
  return (
    <Card loading={isLoading} style={style.card} className="user-card" title="Thông tin cá nhân">
      <Descriptions column={1} layout="horizontal">
        <Descriptions.Item label="Tên đăng nhập">{user.username || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Tên đầy đủ">{user.fullName || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email || 'Thông tin trống'}</Descriptions.Item>
        <Descriptions.Item label="Tài sản">{numberWithCommas(user.diamond) + ' kim cương'|| 'Thông tin trống'}</Descriptions.Item>
        {/* <Descriptions.Item label="Số tiền đã nạp">{(numberWithCommas(user.amount) + ' VND'|| 'Thông tin trống')}</Descriptions.Item> */}
        <Descriptions.Item label="Số tiền hiện có">{numberWithCommas(user.currentAmount) + ' VND'|| 'Thông tin trống'}</Descriptions.Item>
      </Descriptions>

      <Image src={`/character/${char}.png`} width="100%"/>
    </Card>
  )
}