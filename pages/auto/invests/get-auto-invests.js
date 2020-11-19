import MainLayout from '@layouts/main'
import { PageHeader, Row, Col, Table, Descriptions } from 'antd';
import { useEffect, useState } from 'react';
import axios from '../../../configs/api-request';
import { numberWithCommas } from '@configs/helper';

export default function GetAutoInvests() {
  const [loading, setLoading] = useState(true);
  const [autoInvests, setAutoInvests] = useState([]);
  let sectors = [];

  const columns = [
    {
      title: 'Loại khác hàng',
      dataIndex: 'typeCustomer',
      key: 'typeCustomer',
    },
    {
      title: 'Ngành nghề',
      dataIndex: 'career',
      key: 'career',
    },
    {
      title: 'Lợi tức đầu tư',
      key: 'investmentReturn',
      dataIndex: 'investmentReturn',
    },
    {
      title: 'Kì hạn đầu tư',
      key: 'investmentTerm',
      dataIndex: 'investmentTerm',
    },
    {
      title: 'Số tiền đầu tư',
      key: 'investmentAmount',
      dataIndex: 'investmentAmount',
    }
  ];

  const getSectorName = sector => {
    const sectorObj = sectors.find(item => item.Val === sector);
    return sectorObj ? sectorObj.Content : 'No info';
  }

  const setTableSource = item => {
    return {
      key: item.ID,
      typeCustomer: item.CustType || 'No info',
      career: getSectorName(item.Sector),
      investmentReturn: item.MinRate + " - " + item.MaxRate + '%',
      investmentTerm: item.MinTerm + " - " + item.MaxTerm + ' tháng',
      investmentAmount: numberWithCommas(item.MinAmt) + " - " + numberWithCommas(item.MaxAmt) + ' VND'
    };
  };

  const fetchData = async () => {
    try {
      const sectorsResult = await axios.get('/sectors');
      sectors = sectorsResult.data.Sectors.SectorInfo;

      const autoInvestsResult = await axios.get("/get-auto-invests");
      const autoInvestList = autoInvestsResult.data.AutoInvestList.AutoInvestInfo ? autoInvestsResult.data.AutoInvestList.AutoInvestInfo.map(setTableSource) : [];
      setAutoInvests(autoInvestList);

      setLoading(false)
    } catch (e) {
      console.log(e);
    };
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <PageHeader
        className="site-page-header"
        title="Danh sách"
        style={{ paddingLeft: 0 }}
      />

      <Descriptions title="Các Robot đang hoạt động">
        <div className="mt-5">
          <Table
            bordered
            loading={loading}
            dataSource={autoInvests}
            columns={columns}
          />
        </div>
      </Descriptions>
    </MainLayout>
  )
}