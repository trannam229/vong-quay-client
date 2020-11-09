import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Input, Select, Table, Form } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';

export default function Example() {
  const columns = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngành',
      dataIndex: 'sector',
      key: 'sector',
    },
    {
      title: 'Hạng',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Lợi suất',
      key: 'int',
      dataIndex: 'int',
    },
    {
      title: 'Số tiền',
      key: 'amt',
      dataIndex: 'amt',
    },
    {
      title: 'Kỳ hạn',
      key: 'term',
      dataIndex: 'term',
    },
  ];

  const [state, setState] = useState({
    lnInfo: [],
    sectors: [],
    loading: true
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = {};
        const sectorsResult = await axios.get('/sectors', { params });
        if (sectorsResult.data.Status.Code === '0') {
          data.sectors = sectorsResult.data.Sectors.SectorInfo;
        } else {
          console.log(accountResult.data.Status.Message)
        }


        const currentDate = new Date();
        const params = {
          FromDate: `${currentDate.getFullYear() - 1}-${currentDate.getMonth()}-01`,
          ToDate: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate().length > 1 ? currentDate.getDate() : '0' + currentDate.getDate()}`,
        }
        const lnResult = await axios.get('/ln', { params });
        if (lnResult.data.Status.Code === '0') {
          data.lnInfo = lnResult.data.LNInfoList
            ? lnResult.data.LNInfoList.LNInfo.map(item => {
              return {
                key: item.RN,
                name: item.ShortName,
                sector: data.sectors.find(sector => sector.Val === item.Sector).Content,
                class: '?',
                int: item.int,
                amt: item.rlsamt,
                term: item.term + ' tháng'
              };
            })
            : [];
          data.loading = false;
        } else {
          console.log(ciResult.data.Status.Message)
        }

        setState(data)
      } catch (e) {
        console.log(e.message);
      }
    }

    fetchData();
  }, []);

  const style = {};

  const getStatusList =  [
    'Trong hạn',
    'Đã hoàn thành',
    'Chậm trả có khả năng thu hồi',
    'Nợ xấu'
  ].map(item => (<Select.Option value={item} key={item}>{item}</Select.Option>));

  const getCustomerTypeList = [
    'Doanh nghiệp',
    'Hộ kinh doanh',
    'Cá nhân'
  ].map(item => (<Select.Option value={item} key={item}>{item}</Select.Option>));

  const getSectorsList = state.sectors.map(item => (<Select.Option value={item.Val} key={item.Val}>{item.Content}</Select.Option>));

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh mục đầu tư"
        style={{ paddingLeft: 0 }}
      />
      <Form
        layout="vertical"
      >
        <Row>
          <Col span="7">
            <Form.Item label="Lọc theo tình trạng khoản đầu tư" name="status">
              <Select>
                {getStatusList}
              </Select>
            </Form.Item>
          </Col>
          <Col span="7" offset="1">
            <Form.Item label="Lọc theo loại khách hàng" name="customerType">
              <Select>
                {getCustomerTypeList}
              </Select>
            </Form.Item>
          </Col>
          <Col span="7" offset="1">
            <Form.Item label="Lọc theo ngành nghề" name="sector">
              <Select>
                {getSectorsList}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        bordered="true"
        loading={state.loading}
        dataSource={state.lnInfo}
        columns={columns}
        className="mt-4"
      />
    </MainLayout>
  )
}
