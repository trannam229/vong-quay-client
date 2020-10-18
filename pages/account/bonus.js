import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Table } from 'antd';

export default function Example() {
  const columns = [
    {
      title: 'Tên nhà đầu tư',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày mở TK',
      dataIndex: 'openDate',
      key: 'openDate',
    },
    {
      title: 'Trạng thái TK',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Tiền thưởng lũy kế',
      key: 'bonus',
      dataIndex: 'bonus',
    },

    {
      title: 'Tiền thưởng dự kiến tháng này',
      key: 'tempBonus',
      dataIndex: 'tempBonus',
    },
    {
      title: 'Thuế TNCN',
      key: 'tax',
      dataIndex: 'tax',
    },
    {
      title: 'Tiền thưởng dự kiến sau thuế',
      key: 'tempBonusAfterTax',
      dataIndex: 'tempBonusAfterTax',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Nguyễn Phúc An',
      openDate: '15.02.2020',
      status: 'Đang đầu tư',
      bonus: '50,000,000',
      tempBonus: '50,000,000',
      tax: '50,000,000',
      tempBonusAfterTax: '50,000,000'
    },
    {
      key: '2',
      name: 'Nguyễn Phúc An',
      openDate: '15.02.2020',
      status: 'Chưa đầu tư',
      bonus: '15,000,000',
      tempBonus: '15,000,000',
      tax: '10,000,000',
      tempBonusAfterTax: '50,000,000'
    },
    {
      key: '2',
      name: 'Nguyễn Phúc An',
      openDate: '15.02.2020',
      status: 'Chưa đầu tư',
      bonus: '15,000,000',
      tempBonus: '15,000,000',
      tax: '10,000,000',
      tempBonusAfterTax: '50,000,000'
    },
  ];

  const styleTable = {
    bordered: true,
  }

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Tiền thưởng"
        style={{ paddingLeft: 0 }}
      />

      <div>
        <p class="font-weight-bold">Chương trình phát triển đối tác</p>
        <p class="mb-0">Bạn sẽ nhận được tiền thưởng mỗi khi người được bạn giới thiệu mở tài khoản và đầu tư trong 3 tháng đầu tiên. Thưởng sẽ được trả vào tháng kế tiếp.
Hãy giới thiệu thêm nhiều bạn bè tham gia đầu tư để nhận thưởng hấp dẫn.</p>
      </div>

      <div class="mt-5">
        <p class="font-weight-bold">Xem tiền thưởng</p>
        <Row>
          <Col
            span={10}
            style={{ backgroundColor: "#A4EAFF", padding: "10px" }}
            class="p-2"
          >
            <Row>
              <Col span={16}>Tiền thưởng đã trả lũy kế</Col>
              <Col span={8}>10,000,000 VND</Col>
            </Row>
          </Col>
          <Col
            span={10}
            style={{ backgroundColor: "#A4EAFF", padding: "10px" }}
            offset={4}
          >
            <Row>
              <Col span={16}>Tiền thưởng đã trả lũy kế</Col>
              <Col span={8}>10,000,000 VND</Col>
            </Row>
          </Col>
        </Row>
      </div>

      <div class="mt-5">
        <p class="font-weight-bold">Danh sách các nhà đầu tư giới thiệu</p>
        <Table
          {...styleTable}
          dataSource={data}
          columns={columns}
        />
      </div>
    </MainLayout>
  )
}
