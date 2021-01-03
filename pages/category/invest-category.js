import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Descriptions, Input, Select, Table, Form, DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import moment from 'moment';
import { numberWithCommas } from '@configs/helper';
import { unionBy } from 'lodash';

export default function Example() {

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    lnInfo: [],
    filterInfo: [],
    sectors: [],
    columns: [],
    BussinessType: 0,
    DebtType: 0,
  });

  const fetchData = async (date1, date2) => {
    try {
      const data = {};
      const sectorsResult = await axios.get('/sectors');
      data.sectors = sectorsResult.data.Sectors.SectorInfo;

      const params = {
        FromDate: date1 || moment().subtract(1, 'year').format('YYYY-MM-DD').toString(),
        ToDate: date2 || moment().format('YYYY-MM-DD').toString(),
        Status: status || ''
      }
      const lnResult = await axios.get('/ln', { params });
      data.lnInfo = lnResult.data.LNInfoList
        ? lnResult.data.LNInfoList.LNInfo.map(item => {
          return {
            key: item.RN,
            name: item.ShortName,
            sector: data.sectors.find(sector => sector.Val === item.Sector).Content,
            class: item.ClassCf,
            int: item.int + '%',
            amt: numberWithCommas(item.rlsamt),
            term: item.term + ' tháng',
            rlsDate: item.Rlsdate ? moment(item.Rlsdate).utc().format('DD/MM/YYYY') : 'No info',
            BussinessType: item.BussinessType,
            DebtType: item.DebtType,
          };
        })
        : [];
      data.filterInfo = data.lnInfo;
      data.columns = [
        {
          title: 'Tên chiến dịch',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Ngành',
          dataIndex: 'sector',
          key: 'sector',
          filters: unionBy(data.lnInfo, 'sector').map(({ sector }) => ({ text: sector, value: sector })),
          onFilter: (value, record) => record.sector.indexOf(value) === 0
        },
        {
          title: 'Hạng',
          dataIndex: 'class',
          key: 'class',
          filters: unionBy(data.lnInfo, 'class').map(({ class: cl }) => ({ text: cl, value: cl })),
          onFilter: (value, record) => record.class.indexOf(value) === 0
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
          title: 'Kỳ hạn còn lại',
          key: 'term',
          dataIndex: 'term',
          filters: unionBy(data.lnInfo, 'term').map(({ term }) => ({ text: term, value: term })),
          onFilter: (value, record) => record.term.indexOf(value) === 0
        },
        {
          title: 'Ngày đầu tư',
          key: 'rlsDate',
          dataIndex: 'rlsDate',
        },
      ];

      setState(data)
      setLoading(false);
    } catch (e) {
      console.log(e.message);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const filterInfo = state.lnInfo.filter((item) => {
      if(state.DebtType && state.DebtType != 0){
        return item.DebtType == state.DebtType;
      }
      if(state.BussinessType && state.BussinessType != 0){
        return item.BussinessType == state.BussinessType;
      }
      return true;
    });
    setState({...state, filterInfo})
    setLoading(false);
  }, [loading])
  const getStatusList = [
    {value: 'NORMAL', name: 'Trong hạn'},
    {value: 'DONE', name: 'Đã hoàn thành'},
    {value: 'OVERDUE', name: 'Chậm trả có khả năng thu hồi'},
    {value: 'BAD', name: 'Nợ xấu'},
  ].map(item => (<Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>));

  const getCustomerTypeList = [
    {value: 'DN', name: 'Doanh nghiệp'},
    {value: 'HKD', name: 'Hộ kinh doanh'},
    {value: 'CN', name: 'Cá nhân'},
  ].map(item => (<Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>));


  const filterData = (val, type) => {
    setLoading(true);
    setState({ ...state, [type]: val })
  };

  const handleDateChange = dates => {
    fetchData(dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD'))
  };

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
            <Form.Item label="Lọc theo tình trạng khoản đầu tư" name="DebtType">
              <Select placeholder="Lọc theo tình trạng khoản đầu tư" onChange={(val) => filterData(val, 'DebtType')}>
                <Select.Option value={0} key={0}>Chọn tất cả</Select.Option>
                {getStatusList}
              </Select>
            </Form.Item>
          </Col>
          <Col span="7" offset="1">
            <Form.Item label="Lọc theo loại khách hàng" name="BussinessType">
              <Select placeholder="Lọc theo loại khách hàng" onChange={(val) => filterData(val, 'BussinessType')}>
                <Select.Option value={0} key={0}>Chọn tất cả</Select.Option>
                {getCustomerTypeList}
              </Select>
            </Form.Item>
          </Col>
          <Col span="7" offset="1">
            <Form.Item label="Thời gian" name="dateRange" style={{ color: '#03b1fe' }}>
              <DatePicker.RangePicker style={{ width: '100%' }} onChange={handleDateChange} defaultValue={[moment().subtract(1, 'year'), moment()]} />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <div className="mt-2">
        <p className="font-weight-bold" style={{ fontSize: '16px' }}>Danh mục đầu tư chi tiết</p>
        <Table
          bordered="true"
          loading={loading}
          dataSource={state.filterInfo}
          columns={state.columns}
          className="mt-4 invest-category"
          pagination={{ defaultPageSize: 5 }}
        />
      </div>

    </MainLayout>
  )
}
