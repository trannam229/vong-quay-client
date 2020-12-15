import MainLayout from '@layouts/main';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import { PageHeader, Table, Button, Modal, Card, Descriptions, Input, Form } from 'antd';
import { numberWithCommas } from '@configs/helper';
import {unionBy} from 'lodash';
export default function Example() {

  const [items, setItems] = useState({ loading: true });
  const [columns, setColumns] = useState([]);
  const [modal, setModal] = useState({ visible: false, itemDetail: null });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = {};
      const priceBoardResult = await axios.get("/price-board");
      const priceBoard = priceBoardResult.data.PriceBoardList?.PriceBoard.map(item => {
        item.key = item.RN;
        item.CustomerType = 'Doanh nghiệp';
        item.invested = numberWithCommas(item.BRegAmt - item.BRegRemain);
        item.AvlAmt = numberWithCommas(item.AvlAmt);
        item.BRegAmt = numberWithCommas(item.BRegAmt);
        item.BRegRemain = numberWithCommas(item.BRegRemain);
        return item;
      }) ?? [];

      const priceBoardHKDResult = await axios.get("/price-board-hkd");
      const priceBoardHKD = priceBoardHKDResult.data.PriceBoardList?.PriceBoard.map(item => {
        item.key = item.RN;
        item.CustomerType = 'HKD';
        item.invested = numberWithCommas(item.BRegAmt - item.BRegRemain);
        item.AvlAmt = numberWithCommas(item.AvlAmt);
        item.BRegAmt = numberWithCommas(item.BRegAmt);
        item.BRegRemain = numberWithCommas(item.BRegRemain);
        return item;
      }) ?? [];

      const autoInvests = await axios.get("/get-auto-invests");
      const autoInvest = autoInvests.data.AutoInvestList ? autoInvests.data.AutoInvestList.AutoInvestInfo.slice(-1)[0] : null;
      const dataList = priceBoard.concat(priceBoardHKD);

      const showModal = (id) => {
        const itemDetail = dataList.find(item => item.ReqID === id);
        setModal({
          visible: true,
          itemDetail: itemDetail
        });
      };
      const cols = [
        {
          title: 'Tên chiến dịch',
          dataIndex: 'ShortName',
          key: 'ShortName',
          render: (item) => {
            return (item || 'No data available');
          }
        },
        {
          title: 'Thông tin KH',
          dataIndex: 'InfoURL',
          render: (item) => {
            return (
              <a href={item} target="_blank">Xem thêm</a>);
          }
        },
        {
          title: 'Loại KH',
          dataIndex: 'CustomerType',
          key: 'CustomerType',
          filters: unionBy(dataList, 'CustomerType').map(({ CustomerType }) => ({ text: CustomerType, value: CustomerType })),
          onFilter: (value, record) => record.CustomerType.indexOf(value) === 0
        },
        {
          title: 'Hạng',
          dataIndex: 'CustClass',
          key: 'CustClass',
          filters: unionBy(dataList, 'CustClass').map(({ CustClass }) => ({ text: CustClass, value: CustClass })),
          onFilter: (value, record) => record.CustClass.indexOf(value) === 0
        },
        {
          title: 'Kì hạn',
          dataIndex: 'Term',
          key: 'Term',
          render: (term) => {
            return <>{term} Tháng</>;
          },
          filters: unionBy(dataList, 'Term').map(({ Term }) => ({ text: Term, value: Term })),
          onFilter: (value, record) => record.Term.indexOf(value) === 0
        },
        {
          title: 'Lợi suất',
          dataIndex: 'Int',
          key: 'Int',
          render: (int) => {
            return <>{int}%</>
          },
          filters: unionBy(dataList, 'Int').map(({ Int }) => ({ text: Int, value: Int })),
          onFilter: (value, record) => record.Int.indexOf(value) === 0
        },
        {
          title: 'Ngành',
          dataIndex: 'Sector',
          key: 'Sector',
          filters: unionBy(dataList, 'Sector').map(({ Sector }) => ({ text: Sector, value: Sector })),
          onFilter: (value, record) => record.Sector.indexOf(value) === 0
        },
        {
          title: 'Số tiền kêu gọi đầu tư',
          dataIndex: 'BRegAmt',
          key: 'BRegAmt',
        },
        {
          title: '% đã đầu tư',
          dataIndex: 'InvestedRate',
          key: 'InvestedRate',
          render: (investedRate) => <>{investedRate}%</>
        },
        {
          title: 'Số tiền có thể đầu tư',
          dataIndex: 'BRegRemain',
          key: 'BRegRemain',
        },
        {
          title: 'Trạng thái',
          dataIndex: 'OrderType',
          key: 'OrderType',
        },
        {
          title: '',
          key: 'action',
          dataIndex: 'ReqID',
          render: (id) => {
            return <Button onClick={() => showModal(id)}>Đầu tư</Button>
          }
        },
      ];
      setItems({
        dataList,
        autoInvest: autoInvest,
        loading: false
      });
      setColumns(cols);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => { fetchData() }, []);

  const renderModal = () => {
    if (!modal.itemDetail) return;
    return (
      <Card className="invest-modal-card" title={`Số dư có thể đầu tư: ` + modal.itemDetail.BRegRemain}>
        <Descriptions column={1} className="category-dashboard-header" bordered title={modal.itemDetail.ShortName || modal.itemDetail.FullName}>
          <Descriptions.Item label="Đã đăng ký">{modal.itemDetail.invested}</Descriptions.Item>
          <Descriptions.Item label="Mục tiêu">{modal.itemDetail.BRegAmt}</Descriptions.Item>
          <Descriptions.Item label="Lợi tức">{modal.itemDetail.Int}%</Descriptions.Item>
          <Descriptions.Item label="Thời gian">{modal.itemDetail.Term} tháng</Descriptions.Item>
          {
            !items.autoInvest ? '' :
              <>
                <Descriptions.Item label="Số tiền đầu tư tối thiểu">{numberWithCommas(items.autoInvest.MinAmt)}</Descriptions.Item>
                <Descriptions.Item label="Số tiền đầu tư tối đa">{numberWithCommas(items.autoInvest.MaxAmt)}</Descriptions.Item>
              </>
          }
        </Descriptions>
        <Form layout="vertical">
          <Form.Item label="Nhập số tiền đầu tư">
            {
              !items.autoInvest
                ? <Input type="number" suffix="VND" min={items.autoInvest.MinAmt} max={items.autoInvest.MaxAmt} onChange={(e) => setModal({ ...modal, input: e.target.value })} />
                : <Input type="number" suffix="VND" onChange={(e) => setModal({ ...modal, input: e.target.value })} />
            }
          </Form.Item>
        </Form>
      </Card>
    )
  }

  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      const iRegResult = await axios.post("/ireg", {
        ReqID: modal.itemDetail.ReqID,
        Amt: +modal.input || 0
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

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Đầu tư"
        style={{ paddingLeft: 0 }}
      />

      <Table bordered dataSource={items.dataList} columns={columns} loading={items.loading} className="trade-invest" />
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