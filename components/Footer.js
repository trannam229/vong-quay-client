import Link from 'next/link';
import { Image } from 'antd';
import Cookies from 'js-cookie';
import { CheckCircleFilled, RightOutlined } from '@ant-design/icons'
// import navStyles from '../styles/Nav.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Nav() {
  return (
    <div className='container-fluid footer'>
      <div className="card">
        <div className="heading text-center">
          <div>
            <Image preview={false} width={400} src="/logo.png"></Image>
          </div>
          <p className="bdr"></p>
        </div>
        <div className="card-body">
          <div className="row m-0 pt-5">
            <div className="card card-detail col-12 col-md-2"></div>
            <div className="card card-detail col-12 col-md-4">
              <div className="card-content">
                <div className="card-title"> <FontAwesomeIcon className="fa-3x" icon={['fas', 'check-circle']} /> UY TÍN - NHANH CHÓNG - 24/7</div>
                <div className="row">
                  <p className="col-12 col-md-6">Hơn 5000 lượt quay mỗi ngày</p>
                  <p className="col-12 col-md-6">Đa dạng vòng quay - sự kiện</p>
                  <p className="col-12 col-md-6">Hơn 1 triệu kim cương được rút</p>
                  <p className="col-12 col-md-6">Rút kim cương cực nhanh</p>
                </div>

                <div className="learn-more">
                  <p> Tham gia ngay &gt; </p>
                </div>
              </div>
            </div>
            <div className="card card-detail col-12 col-md-4">
              <div className="card-content">
                <div className="card-title"> <FontAwesomeIcon className="fa-3x" icon={['fas', 'id-card']} /> LIÊN HỆ HỢP TÁC, QUẢNG CÁO, CHI NHÁNH </div>
                <div>
                  <p><b>Email:</b> vongquaybuilder@gmail.com</p>
                  <p><b>Số điện thoại:</b> 0999666888</p>
                  <p><b>Facebook:</b> www.facebook.com/vongquaybuilder</p>
                </div>

                <div className="learn-more">
                  <p> Liên hệ ngay &gt; </p>
                </div>
              </div>
            </div>
            <div className="card card-detail col-12 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
