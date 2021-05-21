import { useRouter } from 'next/router'
import axios from '@configs/api-request';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { numberWithCommas } from '@configs/helper';
import { Card, Table, Row, Col, Image } from 'antd';
import moment from 'moment';
import Spin from 'components/Spin';
export default function Home() {
  const [dataTable, setDataTable] = useState([]);
  const [listRotation, setlistRotation] = useState([]);
  const [unit, setUnit] = useState();

  const column = [
    {
      title: 'Người chơi',
      key: 'username',
      dataIndex: 'username',
    },
    {
      title: 'Phần thưởng',
      dataIndex: 'value',
      key: 'value',
      render: (value) => numberWithCommas(value) + ' ' + unit
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
      // render: (x) => moment(x).format('DD/MM/YYYY | HH:mm:ss')
    },
  ];

  const dummy = [
    {
      key: 1,
      username: 'trannam',
      value: 100,
      time: '10 giây trước',
    },
    {
      key: 2,
      username: 'trannam1',
      value: 500,
      time: '40 giây trước',
    },
    {
      key: 3,
      username: 'trannam2',
      value: 300,
      time: '2 phút trước',
    },
    {
      key: 4,
      username: 'trannam3',
      value: 1000,
      time: '3 phút trước',
    },
    {
      key: 5,
      username: 'trannam4',
      value: 500,
      time: '3 phút trước',
    },
    {
      key: 6,
      username: 'trannam3',
      value: 1000,
      time: '5 phút trước',
    },
    {
      key: 7,
      username: 'trannam4',
      value: 500,
      time: '5 phút trước',
    }
  ]

  const style = {
    card: {
      width: '100%',
      background: 'transparent',
      border: 'none',
    },
    table: {
      background: 'transparent',
    },
    cardListRotation: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
  }

  const fetch = async () => {
    try {
      const appId = localStorage.getItem('appId');
      setUnit(localStorage.getItem('unit'))

      const resListRotation = await axios.get(`/rotation/getByAppId?appId=${appId}`);
      setlistRotation(resListRotation.data.map(x => {
        x.key = x.id;
        return x;
      }));

      // const res = await axios.get('/diamondDraw/getAll');
      // res.data.filter(x => x.appId == appId && x.status == 0);
      // res.data.map(x => {
      //   x.key = x.id;
      //   return x;
      // });
      // setDataTable(res.data);
      setDataTable(dummy);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => { fetch() }, []);

  return (
    <>
      <div className="text-index text-center pb-1">
        <h3 className=""><span className="orange-color">VÒNG QUAY MAY MẮN</span></h3>
        <p>Sự kiện nhận quà tri ân game thủ chính thức từ Free Fire VN.</p>
        <p>Đăng nhập ngay và quay thưởng ngay với giá ưu đãi, không giới hạn số lượng.</p>
      </div>

      <Card style={style.card}>
        <Row>
          <Col span={12} className="pt-4 mb-5">
            <Spin rotation={listRotation.length ? listRotation[1] : {}}/>
          </Col>
          <Col span={12}>
              <Table
                bordered
                title={() => "LƯỢT QUAY GẦN ĐÂY"}
                style={style.table}
                columns={column}
                className="table-index"
                dataSource={dataTable}
                pagination={{ hideOnSinglePage: true, defaultPageSize: 7 }}
              />
          </Col>
        </Row>
      </Card>

      <Card style={ {...style.card, ...style.cardListRotation} } className="rotation-index mt-5">
        <Row>
          {
            listRotation.map(x => (
              <>
                <Col key={x.key} span={6} className="ml-3">
                  <Image preview={false} src={`http://vongquay.shop/${x.thumbnail}`} />
                  <p className="rotation-name orange-color">{x.rotationName}</p>
                </Col>
              </>
            ))
          }
        </Row>
      </Card>
    </>
  )
}
