import MainLayout from '@layouts/main'
import { PageHeader, Row, Card, Col, Button, Modal, Select, Table, Form, DatePicker, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import moment from 'moment';
import { numberWithCommas } from '@configs/helper';
import { unionBy } from 'lodash';

export default function Example() {

  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(true);
  const [state, setState] = useState({
    lnInfo: [],
    filterInfo: [],
    sectors: [],
    columns: [],
    BussinessType: 0,
    DebtType: 0,
  });
  const [modal, setModal] = useState({ visible: false, itemDetail: null });
  const detailColumn = [
    {
      title: 'Kỳ',
      dataIndex: 'termno',
      key: 'termno',
    },
    {
      title: 'Ngày đến hạn',
      dataIndex: 'DueDate',
      key: 'DueDate',
      render: (item) => {
        return moment(item).utc().format('DD.MM.YYYY');
      }
    },
    {
      title: 'Gốc phải trả',
      dataIndex: 'PrinAmt',
      key: 'PrinAmt',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
    {
      title: 'Gốc đã trả',
      dataIndex: 'Prinpaid',
      key: 'Prinpaid',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
    {
      title: 'Gốc còn lại',
      dataIndex: 'prinremain',
      key: 'prinremain',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
    {
      title: 'Lãi đã trả',
      dataIndex: 'IntPaid',
      key: 'IntPaid',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
    {
      title: 'Lãi còn lại',
      dataIndex: 'intremain',
      key: 'intremain',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
    {
      title: 'Số ngày quá hạn',
      dataIndex: 'NoOverDate',
      key: 'NoOverDate',
    },
    {
      title: 'Lãi phạt gốc chậm trả',
      dataIndex: 'IntOvd',
      key: 'IntOvd',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
    {
      title: 'Lãi phạt lãi chậm trả',
      dataIndex: 'IntIntOvd',
      key: 'IntIntOvd',
      render: (item) => {
        return numberWithCommas(item);
      }
    },
  ]

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
            lnacctno: item.lnacctno
          };
        })
        : [];
      data.filterInfo = data.lnInfo;

      const showModal = async (lnacctno) => {
        setModal({
          visible: true
        });
        setDetailLoading(true);
        try {
          const itemDetail = data.lnInfo.find(item => item.lnacctno === lnacctno);
          const params = {
            lnacctno: lnacctno || ''
          }
          const lndtlResult = await axios.get('/lndtl', { params });
          const lndtlInfo = lndtlResult.data.LNDtlInfoList
            ? lndtlResult.data.LNDtlInfoList?.LNDtlInfo.map(item => { return { key: item.RN, ...item }})
            : [];
          setModal({
            visible: true,
            itemDetail: itemDetail,
            lndtlInfo: lndtlInfo
          });
          setDetailLoading(false);
        } catch (e) {
          console.log(e.message);
          setDetailLoading(false);
        }
      };

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
        {
          title: '',
          key: 'action',
          dataIndex: 'lnacctno',
          render: (lnacctno) => {
            return <Button onClick={() => showModal(lnacctno)}>Chi tiết</Button>
          }
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
    setLoading(true);
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

  const statusList = {
    'NORMAL': 'Trong hạn',
    'DONE': 'Đã hoàn thành',
    'OVERDUE': 'Chậm trả có khả năng thu hồi',
    'BAD': 'Nợ xấu'
  }

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

  const handleCancel = () => {
    setModal({ 
      ...modal,
      visible: false
    });
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

      <div className="">
        <p className="font-weight-bold" style={{ fontSize: '16px', marginBottom: '10px' }}>Danh mục đầu tư chi tiết</p>
        <Table
          bordered="true"
          loading={loading}
          dataSource={state.filterInfo}
          columns={state.columns}
          className="mt-0 invest-category"
          pagination={{ defaultPageSize: 7 }}
        />
      </div>

      <Modal
        visible={modal.visible}
        onCancel={handleCancel}
        footer={null}
        width={'90%'}
      >
        <Card loading={detailLoading} className="invest-category-modal-card" title="Thông tin chi tiết">
          <Descriptions column={4}>
            <Descriptions.Item label="Tên khách hàng" span={4}>{modal.itemDetail?.name  || 'Không xác định'}</Descriptions.Item>
            <Descriptions.Item label="Ngày giao dịch">{modal.itemDetail?.rlsDate  || 'Không xác định'}</Descriptions.Item>
            <Descriptions.Item label="Số hợp đồng">{modal.itemDetail?.lnacctno  || 'Không xác định'}</Descriptions.Item>
            <Descriptions.Item label="Trạng thái">{statusList[modal.itemDetail?.DebtType] || 'Không xác định'}</Descriptions.Item>
            <Descriptions.Item label="Lãi suất">{modal.itemDetail?.int  || 'Không xác định'}</Descriptions.Item>
          </Descriptions>
          <Table
            bordered="true"
            dataSource={modal.lndtlInfo}
            columns={detailColumn}
            className="mt-2 invest-category-detail-table"
            pagination={{ defaultPageSize: 7 }}
          />
        </Card>
      </Modal>

    </MainLayout>
  )
}
