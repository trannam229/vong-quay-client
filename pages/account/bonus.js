import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Table, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';

export default function Example() {
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

  const [state, setState] = useState({
    styleTable: {
      loading: true
    }
  });

  useEffect(() => {
    const setTableSource = item => {
      return {
        key: item.RN,
        name: item.Fullname,
        openDate: '',
        status: item.Status,
        bonus: item.Accamt,
        tempBonus: item.TotalEstAmt,
        tax: item.Vatamt,
        tempBonusAfterTax: item.EstAmt
      };
    };

    async function fetchData() {
      try {
        const decoded = jwt.decode(Cookies.get('access_token'));
        const params = { pv_Custid: decoded.CfInfo.CustID };
        const { data } = await axios.get("/re", { params });

        setState({
          styleTable: {
            loading: false
          },
          cfInfo: decoded.CfInfo,
          reInfoList: data.REInfoList ? data.REInfoList.map(setTableSource) : [],
        });
      } catch (e) {
        alert(e);
      };
    };
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
        <Descriptions.Item>Bạn sẽ nhận được tiền thưởng mỗi khi người được bạn giới thiệu mở tài khoản và đầu tư trong 3 tháng đầu tiên. Thưởng sẽ được trả vào tháng kế tiếp.
Hãy giới thiệu thêm nhiều bạn bè tham gia đầu tư để nhận thưởng hấp dẫn.</Descriptions.Item>
      </Descriptions>

      <div className="mt-5">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Xem tiền thưởng</p>
        <Row>
          <Col
            span={10}
            style={{ backgroundColor: "#A4EAFF", padding: "10px" }}
            className="p-2"
          >
            <Row>
              <Col span={16}>Tiền thưởng đã trả lũy kế</Col>
              <Col span={8}>10,000,000 VND</Col>
            </Row>
          </Col>
          <Col
            span={10}
            style={{ backgroundColor: "#A4EAFF", padding: "10px" }}
            offset={4}
          >
            <Row>
              <Col span={16}>Tiền thưởng đã trả lũy kế</Col>
              <Col span={8}>10,000,000 VND</Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div className="mt-5">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Danh sách các nhà đầu tư giới thiệu</p>
        <Table
          bordered="true"
          loading={state.styleTable.loading}
          dataSource={state.reInfoList}
          columns={columns}
        />
      </div>
    </MainLayout>
  )
}
