import { Table, Switch, Radio, Form, Space } from 'antd';
import styles from './auto-invest.less';
import MainLayout from '@/layouts/main';


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
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];
export default function Example() {
  return <MainLayout><Table dataSource={dataSource} columns={columns} />
  <div className={styles.title}>AAAAAAAAAAAAAAAAAAAAA</div>
  </MainLayout>
}
