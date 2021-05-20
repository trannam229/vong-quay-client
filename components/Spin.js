import { Image, notification } from 'antd';
import { useEffect, useState } from 'react';
import axios from '@configs/api-request';

export default function Spin() {
  const [drawStyle, setDrawStyle] = useState({});

  const style = {
  }

  const id = 114;

  const randomDraw = (number) => {
    const x = 1024;
    const y = 9999;
    const deg = Math.floor(Math.random() * (x - y)) + y;

    setDrawStyle({
      transition: 'all ease 5s',
      transform: `rotate(${+deg}deg)`
    })
  }

  const resetDraw = () => {
    setDrawStyle({
      transform: `rotate(0deg)`
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
    try {
      const res = await axios.get(`/rotation/turning?rotationId=${id}`);
      randomDraw(res.data.id);
      setTimeout(() => sucessNoti(res.data), 5000)
      setTimeout(() => resetDraw(), 6000)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="rotation-item">
      <Image preview={false} style={drawStyle} width="90%" src='/rotation-sample.png' />
      <Image preview={false} className="rotation-btn" src="/btn-quay.png" onClick={draw}/>
    </div>
  )
}