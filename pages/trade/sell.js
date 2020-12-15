import MainLayout from '@layouts/main';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import { PageHeader, Table, Button, Modal, Card, Descriptions, Input, Form } from 'antd';
import moment from 'moment';
import { numberWithCommas, getSectorName } from "@configs/helper";
import { unionBy } from 'lodash';
export default function Example() {
  const [columns, setColumns] = useState([]);
  const [items, setItems] = useState({ loading: true });
  const [modal, setModal] = useState({ visible: false, itemDetail: null });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = (id) => {
    const itemDetail = items.dataList.find(item => item.DealID === id);
    setModal({
      visible: true,
      itemDetail: itemDetail
    });
  };

  const renderModal = () => {
    if (!modal.itemDetail) return;

    return (
      <Card className="invest-modal-card" title={`Thời gian đầu tư: ` + moment().format('h a DD.MM.YYYY')}>
        <Descriptions column={1} className="category-dashboard-header" title={modal.itemDetail.ShortName || modal.itemDetail.FullName}>
          <Descriptions.Item label="Ngành">{modal.itemDetail.Sector}</Descriptions.Item>
          <Descriptions.Item label="Vốn gốc">{numberWithCommas(modal.itemDetail.OrgAmt)}</Descriptions.Item>
          <Descriptions.Item label="Gốc đã thu">{numberWithCommas(modal.itemDetail.OrgAmt - modal.itemDetail.RemainAmt)}</Descriptions.Item>
          <Descriptions.Item label="Lợi tức">{modal.itemDetail.Int}%</Descriptions.Item>
          <Descriptions.Item label="Lãi đã thu">{numberWithCommas(modal.itemDetail.IntPaid)}???</Descriptions.Item>
          <Descriptions.Item label="Xếp hạng">{modal.itemDetail.CustClass}</Descriptions.Item>
          <Descriptions.Item label="% sinh lời">{modal.itemDetail.Rate}%???</Descriptions.Item>
          <Descriptions.Item label="Tháng đầu tư">{modal.itemDetail.Term} tháng</Descriptions.Item>
          <Descriptions.Item label="Tháng còn lại">{modal.itemDetail.RemainNoTerm} tháng</Descriptions.Item>
        </Descriptions>
        <Form layout="vertical">
          <Form.Item label="Nhập số tiền bán">
            <Input type="number" suffix="VND" onChange={(e) => setModal({ ...modal, input: e.target.value })} />
          </Form.Item>
        </Form>
      </Card>
    )
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const iRegResult = await axios.post("/ireg-to-sell", {
        DealID: modal.itemDetail.DealID,
        Amt: +modal.input
      });
      if (iRegResult.data.Status.Code !== '0') {
        console.log(iRegResult.data.Status.Message);
        setConfirmLoading(false);
        throw iRegResult.data.Status.Message;
      };
      setModal({ visible: false });
      setConfirmLoading(false);
    } catch (e) {
      setConfirmLoading(false);
      console.log(e);
    }
  };

  const handleCancel = () => {
    setModal({ visible: false });
  };

  const fetchData = async () => {
    try {
      const dealToSellResult = await axios.get("/deal-to-sell");
      if (dealToSellResult.data.Status.Code !== '0') {
        console.log(dealToSellResult.data.Status.Message)
        throw dealToSellResult.data.Status.Message;
      }

      const dealToSell = dealToSellResult.data.DealInfoList?.DealInfo.map(item => {
        item.key = item.DealID;
        item.CustomerType = '';
        return item;
      }) ?? [];
      const cols = [
        {
          title: 'Tên chiến dịch',
          dataIndex: 'ShortName',
          key: 'ShortName',
          render: (item) => {
            return (item || 'No info');
          }
        },
        {
          title: 'Loại KH',
          dataIndex: 'CustomerType',
          key: 'CustomerType',
          filters: unionBy(dealToSell, 'CustomerType').map(({ CustomerType }) => ({ text: CustomerType, value: CustomerType })),
          onFilter: (value, record) => record.CustomerType.indexOf(value) === 0,
          render: (item) => {
            return (item || 'No info')
          }
        },
        {
          title: 'Hạng',
          dataIndex: 'CustClass',
          key: 'CustClass',
          filters: unionBy(dealToSell, 'CustClass').map(({ CustClass }) => ({ text: CustClass, value: CustClass })),
          onFilter: (value, record) => record.CustClass.indexOf(value) === 0,
        },
        {
          title: 'Lợi suất',
          dataIndex: 'Int',
          key: 'Int',
          filters: unionBy(dealToSell, 'Int').map(({ Int }) => ({ text: Int, value: Int })),
          onFilter: (value, record) => record.Int.indexOf(value) === 0,
          render: (int) => {
            return (int + '%');
          }
          
        },
        {
          title: 'Vốn đầu tư ban đầu',
          dataIndex: 'OrgAmt',
          key: 'OrgAmt',
          render: (item) => {
            return (<p>{numberWithCommas(item)}</p>);
          }
        },
        {
          title: 'Vốn gốc còn lại',
          dataIndex: 'RemainAmt',
          key: 'RemainAmt',
          render: (item) => {
            return (<p>{numberWithCommas(item)}</p>);
          },
        },
        {
          title: 'Ngày tất toán',
          dataIndex: 'ClsDate',
          key: 'ClsDate',
          render: (item) => {
            return moment(item).format('DD.MM.YYYY');
          }
        },
        {
          title: 'Lendbiz đánh giá',
          dataIndex: 'EstAmt',
          key: 'EstAmt',
          render: (item) => {
            return (<p>{numberWithCommas(item)}</p>);
          }
        },
        {
          title: 'Phí giao dịch',
          dataIndex: 'FeeAmt',
          key: 'FeeAmt',
          render: (item) => {
            return (<p>{numberWithCommas(item)}</p>);
          }
        },
        {
          title: '',
          key: 'action',
          dataIndex: 'DealID',
          render: (id) => {
            return <Button onClick={() => showModal(id)}>Thoái vốn</Button>
          }
        },
      ];
      setColumns(cols);
      setItems({
        dataList: dealToSell,
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { fetchData() }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Thoái vốn"
        style={{ paddingLeft: 0 }}
      />

      <Table bordered dataSource={items.dataList} columns={columns} loading={items.loading} />
      <Modal
        visible={modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
      >
        {renderModal()}
      </Modal>
    </MainLayout>
  )
}