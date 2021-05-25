import { Card, Descriptions, Table } from 'antd';
import axios from '@configs/api-request';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import moment from 'moment';
import User from '../../components/User';
import History from '../../components/History';
import CardInput from '../../components/Card';
import Diamond from '../../components/Diamond';
import ChangePass from '../../components/ChangePass';
import Logout from '../../components/Logout';

export default function Example() {
  const [tab, setTab] = useState({ key: 'tab1' });

  const tabList = [
    {
      key: 'tab1',
      tab: 'Lịch sử',
    },
    {
      key: 'tab2',
      tab: 'Nạp thẻ',
    },
    {
      key: 'tab3',
      tab: 'Rút kim cương',
    },
    {
      key: 'tab4',
      tab: 'Đổi mật khẩu',
    },
    {
      key: 'tab5',
      tab: 'Đăng xuất',
    },
  ];

  const contentList = {
    tab1: (
      <History></History>
    ),
    tab2: (
      <CardInput></CardInput>
    ),
    tab3: (
      <Diamond></Diamond>
    ),
    tab4: (
      <ChangePass></ChangePass>
    ),
    tab5: (
      <Logout></Logout>
    ),
  };

  const onTabChange = (key, type) => {
    setTab({ [type]: key });
  };
  return (
    <>
      <div className='container-fluid information'>
        <div className="row">
          <div className="col-12 col-md-8">
            <Card
              className="login-card info-card"
              tabList={tabList}
              activeTabKey={tab.key}
              onTabChange={key => { onTabChange(key, 'key'); }}
            >
              {contentList[tab.key]}
            </Card>
          </div>
          <div className="col-12 col-md-4">
            <User></User>
          </div>
        </div>
      </div>
    </>
  )
}