import { Image, notification } from 'antd';
import { useLayoutEffect, useState, useRef, useEffect } from 'react';
import axios from '@configs/api-request';
import _ from 'lodash';

export default function Spin({ rotation }) {
  const [appUnit, setAppUnit] = useState('');
  const [drawStyle, setDrawStyle] = useState({});
  const [count, setCount] = useState(0);
  const [size, setSize] = useState({});
  const refElem = useRef(null);

  useLayoutEffect(() => {
    window.addEventListener('resize', () => setSize({}));
  }, []);

  useEffect(() => {
    setAppUnit(localStorage.getItem('unit'))
  }, []);

  const renderDraw = () => {
    if (_.isEmpty(rotation)) return '';

    const valueList = rotation.createValueJsons;
    const styleItemWidth = count / (valueList.length / 2) - 5;

    const style = {
      span1: {
        top: 0,
        left: `calc(50% - ${styleItemWidth}px + 5px)`,
        paddingTop: '50%',
        borderLeft: `${styleItemWidth}px solid transparent`,
        borderRight: `${styleItemWidth}px solid transparent`,
        borderTopWidth: `${count / 2}px`,
        borderTopStyle: 'solid',
      }
    }
    const transformCalc = (index) => index * 360 / valueList.length;

    const colorPack = [ '#55efc4', '#74b9ff', '#00cec9', '#a29bfe', '#00b894', '#81ecec', '#fdcb6e', '#e17055', '#ff7675', '#55efc4', '#74b9ff', '#00cec9', '#a29bfe', '#00b894', '#81ecec', '#fdcb6e', '#e17055', '#ff7675']

    return (
      <div className="main-box" style={drawStyle}>
        <div className="box">
          {
            valueList.map((value, index) => (
              <span style={{ ...style.span1, transform: `rotate(${transformCalc(index)}deg)`, borderTopColor: `${colorPack[index]}` }}>
                <span className="value-image" style={{ backgroundImage: `url(http://vongquay.shop/${value.photo})` }}></span>
                <span className="value-text">
                  <h3 className="value-value">{value.value}</h3>
                  <p className="value-unit">{appUnit}</p>
                </span>
              </span>
            )
            )
          }
        </div>
      </div>
    )
  }

  const randomDraw = (data) => {
    const index = rotation.createValueJsons.findIndex(x => x.valueId === data.valueId);
    const quantity = rotation.createValueJsons.length;
    const x = 10;
    const y = 27;
    const deg = (Math.floor(Math.random() * (x - y)) + y) * 360 - index * 360 / quantity;
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
        <p>
          Chúc mừng bạn đã trúng {item.text}
        </p>
      </>),
    });
  }

  const draw = async () => {
    if (!_.isEmpty(drawStyle)) return;

    try {
      const res = await axios.get(`/rotation/turning?rotationId=${rotation.id}`);
      randomDraw(res.data);
      setTimeout(() => sucessNoti(res.data), 5000)
      setTimeout(() => resetDraw(), 5500)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="rotation-item-index">
      <p className="rotation-name">{rotation.rotationName} - Chỉ {rotation.price}đ/lần</p>

      <div className="rotation-item" ref={refElem => {
        if (refElem) {
          setCount(refElem.offsetHeight)
        }
      }
      }>
        {renderDraw()}
        {/* <Image preview={false} style={drawStyle} width="90%" src='/rotation-sample.png' /> */}
        <Image preview={false} className="rotation-btn" src="/btn-quay.png" onClick={draw} />
      </div>
    </div>
  )
}