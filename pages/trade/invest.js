import MainLayout from '@layouts/main';
import { useEffect, useState } from 'react';
import axios from '../../configs/api-request';
import { PageHeader, Table, Button, Modal, Card, Descriptions, Input, Form } from 'antd';
import { numberWithCommas } from '@configs/helper';

export default function Example() {
  const columns = [
    {
      title: 'Tên chiến dịch',
      dataIndex: 'ShortName',
      key: 'ShortName',
      render: (item) => {
        return (item || 'No data available');
      }
    },
    {
      title: 'Thông tin khách hàng',
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
    },
    {
      title: 'Hạng',
      dataIndex: 'CustClass',
      key: 'CustClass',
    },
    {
      title: 'Kì hạn',
      dataIndex: 'Term',
      key: 'Term',
      render: (term) => {
        return <>{term} Tháng</>;
      }
    },
    {
      title: 'Lợi suất',
      dataIndex: 'Int',
      key: 'Int',
      render: (int) => {
        return <>{int}%</>
      }
    },
    {
      title: 'Ngành',
      dataIndex: 'Sector',
      key: 'Sector',
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
        return <Button onClick={() => showModal(id)}>Đầu tư ngay</Button>
      }
    },
  ];
  const [items, setItems] = useState({ loading: true });
  const [modal, setModal] = useState({ visible: false, itemDetail: null });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const fetchData = async () => {
    try {
      const data = {};
      const priceBoardResult = await axios.get("/price-board");
      data.priceBoard = priceBoardResult.data.PriceBoardList?.PriceBoard.map(item => {
        item.key = item.RN;
        item.CustomerType = 'Doanh nghiệp';
        item.AvlAmt = numberWithCommas(item.AvlAmt);
        item.BRegAmt = numberWithCommas(item.BRegAmt);
        item.BRegRemain = numberWithCommas(item.BRegRemain);
        return item;
      }) ?? [];

      const priceBoardHKDResult = await axios.get("/price-board-hkd");
      data.priceBoardHKD = priceBoardHKDResult.data.PriceBoardList?.PriceBoard.map(item => {
        item.key = item.RN;
        item.CustomerType = 'HKD';
        item.AvlAmt = numberWithCommas(item.AvlAmt);
        item.BRegAmt = numberWithCommas(item.BRegAmt);
        item.BRegRemain = numberWithCommas(item.BRegRemain);
        return item;
      }) ?? [];

      setItems({
        dataList: [...data.priceBoard, ...data.priceBoardHKD],
        loading: false
      });
    } catch (e) {
      console.log(e);
    }
  }

  const showModal = (id) => {
    const itemDetail = items.dataList.find(item => item.ReqID === id);
    setModal({
      visible: true,
      itemDetail: itemDetail
    });
  };

  const renderModal = () => {
    if (!modal.itemDetail) return;

    return (
      <Card title={`Số dư có thể đầu tư: ` + modal.itemDetail.BRegRemain}>
        <Descriptions column={1} className="category-dashboard-header" title={modal.itemDetail.ShortName || modal.itemDetail.FullName}>
          <Descriptions.Item label="Đã đăng ký">{modal.itemDetail.BRegAmt - modal.itemDetail.BRegRemain}</Descriptions.Item>
          <Descriptions.Item label="Mục tiêu">{modal.itemDetail.BRegAmt}</Descriptions.Item>
          <Descriptions.Item label="Lợi tức">{modal.itemDetail.Int}%</Descriptions.Item>
          <Descriptions.Item label="Thời gian">{modal.itemDetail.Term} tháng</Descriptions.Item>
          <Descriptions.Item label="Số tiền đầu tư tối thiểu">{50000}</Descriptions.Item>
          <Descriptions.Item label="Số tiền đầu tư tối đa">{50000}</Descriptions.Item>
        </Descriptions>
        <Form layout="vertical">
          <Form.Item label="Nhập số tiền đầu tư">
            <Input type="number" suffix="VND" onChange={(e) => setModal({ ...modal, input: e.target.value })} />
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
      console.log(e);
    }
  };

  const handleCancel = () => {
    setModal({ visible: false });
  };

  useEffect(() => { fetchData() }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Đầu tư"
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