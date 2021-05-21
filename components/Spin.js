import { Image, notification } from 'antd';
import { useEffect, useState } from 'react';
import axios from '@configs/api-request';
import _ from 'lodash';

export default function Spin({ rotation }) {
  const [drawStyle, setDrawStyle] = useState({});

  const style = {
    span1: {
      clipPath: 'polygon(50% 100%, 92% 0, 8% 0%)',
      // background: 'pink',
      top: 0,
      left: 120
    },
    span2: {
      clipPath: 'polygon(100% 92%, 0% 50%, 100% 8%)',
      // background: 'blue',
      top: 120,
      right: 0

    },
    span3: {
      clipPath: 'polygon(50% 0%, 8% 100%, 92% 100%)',
      // background: 'black',
      bottom: 0,
      left: 120
    },
    span4: {
      clipPath: 'polygon(0 92%, 100% 50%, 0 8%)',
      // background: 'red',
      top: 120,
      left: 0
    },
  }

  // const style = {
  //   span: {
  //     width: 0,
  //     height: 0,
  //     borderLeft: '122px solid transparent',
  //     borderRight: '122px solid transparent',
  //     borderBottom: '240px solid red',
  //     top: '50%',
  //   },
  //   span1: {
  //     left: 128,
  //     transform: 'rotate(0deg)',
  //   },
  //   span2: {
  //     left: 128,
  //     transform: 'rotate(180deg)',
  //   }
  // }

  const id = rotation.id;
  const renderDraw = () => {
    if (_.isEmpty(rotation)) return '';
    const valueList = rotation.createValueJsons;
    return (
      <div className="main-box" style={drawStyle}>
        <div className="box">
          <div className="box1">
            <span style={{...style.span, ...style.span1}} className="span1"><b>{valueList[0].value}</b></span>
            <span style={{...style.span, ...style.span2}} className="span2"><b>{valueList[1].value}</b></span>
            <span style={style.span3} className="span3"><b>{valueList[2].value}</b></span>
            <span style={style.span4} className="span4"><b>{valueList[3].value}</b></span>
          </div>
          <div className="box2">
            <span style={style.span1} className="span1"><b>{valueList[4]?.value || 0 }</b></span>
            <span style={style.span2} className="span2"><b>{valueList[5]?.value || 0 }</b></span>
            <span style={style.span3} className="span3"><b>{valueList[6]?.value || 0 }</b></span>
            <span style={style.span4} className="span4"><b>{valueList[7]?.value || 0 }</b></span>
          </div>
        </div>
      </div>
    )
  }

  const randomDraw = (data) => {
    const index = rotation.createValueJsons.findIndex(x => x.valueId === data.valueId);
    const x = 5;
    const y = 27;
    const deg = (Math.floor(Math.random() * (x - y)) + y) * 360 - index*90;
    setDrawStyle({
      transition: 'all ease 5s',
      transform: `rotate(${+deg}deg)`
    })
  }

  const resetDraw = () => {
    setDrawStyle({
    })
  }

  const sucessNoti = (item) => {
    notification.open({
      type: 'success',
      description: (<>
        <Image width={80} src={item.photo ? `http://vongquay.shop/` + item.photo : '/treasure.svg'} />
        <p>
          Chúc mừng bạn đã trúng {item.text}
        </p>
      </>),
    });
  }

  const draw = async () => {
    if(!_.isEmpty(drawStyle)) return;

    try {
      const res = await axios.get(`/rotation/turning?rotationId=${id}`);
      randomDraw(res.data);
      setTimeout(() => sucessNoti(res.data), 5000)
      setTimeout(() => resetDraw(), 5500)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="rotation-item">
      {renderDraw()}
      {/* <Image preview={false} style={drawStyle} width="90%" src='/rotation-sample.png' /> */}
      <Image preview={false} className="rotation-btn" src="/btn-quay.png" onClick={draw} />
    </div>
  )
}