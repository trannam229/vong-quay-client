import MainLayout from '@layouts/main';
import { PageHeader, Row, Col, Descriptions, Image, Card } from 'antd';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import axios from '../../configs/api-request';
import { numberWithCommas } from "@configs/helper";

export default function Example() {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({
    cfInfo: {},
    accountInfo: {}
  });
  const rankPoint = [
    { rank: 'BRONZE', point: 0 },
    { rank: 'SILVER', point: 5000 },
    { rank: 'GOLD', point: 15000 },
    { rank: 'DIAMOND', point: 50000 }
  ]

  const getNextRankPoint = (rank) => {
    const index = rankPoint.findIndex(item => item.rank === rank);
    return rankPoint[index + 1];
  };

  const fetchData = async () => {
    try {
      const decoded = jwt.decode(Cookies.get('access_token'));
      const { data } = await axios.get('/account');

      setState({
        cfInfo: decoded.CfInfo,
        accountInfo: data.AccountInfo,
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const style = {
    card: {
      borderRadius: 20,
      border: '2px #69c0ff solid',
      width: 650,
      margin: '0px auto',
    },
    custClass: {
      borderBottom: '2px gray solid',
      fontSize: 18,
      fontWeight: 550,
      color: '#69c0ff'
    },
    custClassText: {
      marginBottom: 7,
    },
    benefit: {
      borderRadius: 5,
      backgroundColor: 'white',
      padding: '15px 15px',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
  };

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Hạng thành viên"
        style={{ paddingLeft: 0 }}
      />
      <Descriptions title="Chương trình khách hàng thân thiết">
        <Descriptions.Item>Bạn sẽ nhận 1 điểm cho mỗi 100.000 VND tiền đầu tư. Hãy tận hưởng những ưu đãi theo chương trình.</Descriptions.Item>
      </Descriptions>

      <Card style={style.card} loading={loading} className="membership-card">
        <Row>
          <Col flex="100px">
            <Image width={130} src={`/${state.cfInfo.CustClass ? state.cfInfo.CustClass.toLowerCase() : 'medal'}.svg`} />
          </Col>
          <Col flex="auto">
            <p>Hạng thành viên hiện tại</p>
            <Row style={style.custClass}>
              <Col flex="80px" style={style.custClassText}>{state.cfInfo.CustClass}</Col>
              <Col style={style.custClassText}>|</Col>
              <Col flex="auto" style={style.custClassText}>{numberWithCommas(state.accountInfo.Point || 0)} ĐIỂM</Col>
            </Row>
            {
              state.cfInfo.CustClass === "DIAMOND"
                ? 'Chúc mừng bạn đã đạt thứ hạng thành viên cao nhất.'
                : (<p>Hãy giành thêm {getNextRankPoint(state.cfInfo.CustClass).point - state.accountInfo.Point} điểm để nâng lên hạng {getNextRankPoint(state.cfInfo.CustClass).rank}.</p>)
            }
          </Col>
        </Row>
      </Card>

      <p className="font-weight-bold" style={{ fontSize: '16px' }}>Hạng thành viên & Quyền lợi</p>
      <Row justify="space-between">
        {
          [
            { medal: 'bronze', name: 'ĐỒNG', benefit: ['Live chat', 'Auto invest (sử dụng hết số dư và Min max)'] },
            { medal: 'silver', name: 'BẠC', benefit: ['Live chat', 'Auto invest (sử dụng hết số dư, hạn mức tối đa theo người gọi vốn)', 'Quà tặng'] },
            { medal: 'gold', name: 'VÀNG', benefit: ['Live chat', 'Auto invest (đầy đủ tính năng)', 'Quà tặng', 'Tham gia event', 'Quà tặng sinh nhật'] },
            { medal: 'diamond', name: 'KIM CƯƠNG', benefit: ['Được nhận mọi ưu đãi', 'Tiếp cận các sản phẩm mới', 'Có nhân viên chăm sóc đặc biệt'] }
          ].map(item => {
            return (
              <Col span={5} style={style.benefit} key={item.name}>
                <Image className="membership-description-img" src={`/${item.medal}.svg`} width={100} />
                <p className="font-weight-bold mt-2 mb-2">{item.name}</p>
                <p className="mb-2">Mặc định cho tất cả các nhà đầu tư</p>
                <ul className="pl-4">
                  {item.benefit.map((item, index) => (<li key={index}>{item}</li>))}
                </ul>
              </Col>
            );
          })
        }
      </Row>
    </MainLayout>
  )
}
