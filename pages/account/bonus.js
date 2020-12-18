import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Table, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';
import { numberWithCommas } from '@configs/helper';
import moment from 'moment';

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    cfInfo: {},
    reInfoList: []
  });

  const columns = [
    {
      title: 'Tên nhà đầu tư',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày mở TK',
      dataIndex: 'openDate',
      key: 'openDate',
    },
    {
      title: 'Trạng thái TK',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Tiền thưởng lũy kế',
      key: 'bonus',
      dataIndex: 'bonus',
    },

    {
      title: 'Tiền thưởng dự kiến tháng này',
      key: 'tempBonus',
      dataIndex: 'tempBonus',
    },
    {
      title: 'Thuế TNCN',
      key: 'tax',
      dataIndex: 'tax',
    },
    {
      title: 'Tiền thưởng dự kiến sau thuế',
      key: 'tempBonusAfterTax',
      dataIndex: 'tempBonusAfterTax',
    },
  ];

  const setTableSource = item => {
    return {
      key: item.RN,
      name: item.Fullname || 'No data',
      openDate: item.OpnDate ? moment(item.OpnDate).format('DD.MM.YYYY') : '',
      status: item.Status,
      bonus: numberWithCommas(item.Accamt),
      tempBonus: numberWithCommas(item.TotalEstAmt),
      tax: numberWithCommas(item.Vatamt),
      tempBonusAfterTax: numberWithCommas(item.EstAmt)
    };
  };

  const fetchData = async () => {
    try {
      const decoded = jwt.decode(Cookies.get('access_token'));
      const { data } = await axios.get("/re");

      setState({
        cfInfo: decoded.CfInfo,
        reInfoList: data.REInfoList ? data.REInfoList.REInfo.map(setTableSource) : [],
      });
      setLoading(false)
    } catch (e) {
      console.log(e);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Tiền thưởng"
        style={{ paddingLeft: 0 }}
      />

      <Descriptions title="Chương trình phát triển đối tác">
        <Descriptions.Item className="pb-0">Bạn sẽ nhận được tiền thưởng mỗi khi người được bạn giới thiệu mở tài khoản và đầu tư trong 3 tháng đầu tiên. Thưởng sẽ được trả vào tháng kế tiếp.
Hãy giới thiệu thêm nhiều bạn bè tham gia đầu tư để nhận thưởng hấp dẫn.</Descriptions.Item>
      </Descriptions>

      <div className="mt-5">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Xem tiền thưởng</p>
        <Row>
          <Col
            span={10}
            style={{ backgroundColor: "#A4EAFF" }}
            className="p-2 pr-4 pl-4"
          >
            <Row>
              <Col span={16}>Tổng số tiền thưởng lũy kế</Col>
              <Col span={8} className="font-weight-bold" style={{ textAlign: "right" }}>{loading ? '' : (state.reInfoList[state.reInfoList.length - 1].bonus + ' VND')}</Col>
            </Row>
          </Col>
          <Col
            span={10}
            style={{ backgroundColor: "#A4EAFF" }}
            offset={4}
            className="p-2 pr-4 pl-4"
          >
            <Row>
              <Col span={16}>Tiền thưởng dự kiến tháng này</Col>
              <Col span={8} className="font-weight-bold" style={{ textAlign: "right" }}>{loading ? '' : (state.reInfoList[state.reInfoList.length - 1].tempBonusAfterTax + ' VND')}</Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Danh sách các nhà đầu tư giới thiệu</p>
        <Table
          className="bonus-table"
          bordered="true"
          loading={loading}
          columns={columns}
          dataSource={state.reInfoList}
        />
      </div>
    </MainLayout>
  )
}
