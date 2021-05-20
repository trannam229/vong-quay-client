import { Descriptions, Card, Button, Modal, Image, Row, Col, notification } from 'antd';
import Link from 'next/link';
import axios from '@configs/api-request';
import { numberWithCommas } from '@configs/helper';
import { useEffect, useState } from 'react';

export default function Example() {
  //Init state
  const [modal, setModal] = useState({ visible: false, modalDatas: null });
  const [listRotation, setlistRotation] = useState([]);
  //Init const data
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên vòng quay',
      key: 'rotationName',
      dataIndex: 'rotationName',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      key: 'price',
      render: (data) => numberWithCommas(data)
    },
    {
      title: 'Đơn vị',
      dataIndex: 'unit',
      key: 'unit',
      render: () => localStorage.getItem('unit')
    },
    {
      title: 'Ảnh thumbnail',
      key: 'thumbnail',
      dataIndex: 'thumbnail',
      render: (thumbnail, record) => <Image width={100} src={thumbnail ? `http://vongquay.shop/` + thumbnail : '/treasure.svg'} />
    },
    {
      title: 'Thao tác',
      key: 'action',
      dataIndex: 'id',
      render: (id) => <Button type="primary" onClick={() => turn(id)}>Quay</Button>
    },
  ];

  //Init function
  const turn = async (id) => {
    try {
      const res = await axios.get(`/rotation/turning?rotationId=${id}`);
      console.log(res.data)
      notification.open({
        type: 'success',
        description: (<>
          <Image width={100} src={res.data.photo ? `http://vongquay.shop/` + res.data.photo : '/treasure.svg'} />
          <p>
            Chúc mừng bạn đã trúng {res.data.text}
          </p>
        </>),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetch = async () => {
    try {
      const res = await axios.get(`/rotation/getByAppId?appId=${localStorage.getItem('appId')}`);
      const data = res.data.filter(x => x.status == '1')
      data.map(x => {
        x.key = x.id;
        return x;
      })
      setlistRotation(data);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => { fetch() }, []);

  const style = {
    card: {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      border: 'none',
    },
  }

  return (
    <>
      <Card title="Danh sách vòng quay sự kiện" className="rotation" style={style.card}>
        {
          listRotation.map(x => (
            <Row className="mb-3">
              <Col span={6} className="ml-3">
                <Image preview={false} src={`http://vongquay.shop/${x.thumbnail}`} />
              </Col>

              <Col span={6} className="ml-3">
                <p className="rotation-name orange-color">{x.rotationName}</p>
              </Col>
            </Row>
          ))
        }
      </Card>
    </>
  )
}
