const { soapTrading } = require('../../configs/soap-http');
const { successResponse, errorResponse } = require('../api-response');

exports.account = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      Custid: req.account.CfInfo.CustID
    };
    const response = await soapTrading('GetAccount', params);
    return successResponse(res, response.GetAccountResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

// RE: reference
exports.re = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      pv_Custid: req.account.CfInfo.CustID
    };
    const response = await soapTrading('GetRE', params);
    return successResponse(res, response.GetREResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};


exports.getPriceBoard = async (req, res) => {
  try {
    const info = req.account.CfInfo;
    const header = {
      Sessionid: info.SessionID,
    };
    const response = await soapTrading('GetPriceBoard', {
      header,
      SearchPriceBoard: {
        SearchPagingInfo: {}
      }
    });
    return successResponse(res, response.GetPriceBoardResult);

  } catch (e) {
    return errorResponse(res, e.message);
  }
}

exports.getPriceBoardHKD = async (req, res) => {
  try {
    const info = req.account.CfInfo;
    const header = {
      Sessionid: info.SessionID,
    };
    const response = await soapTrading('GetPriceBoardHKD', {
      header,
      SearchPriceBoard: {
        SearchPagingInfo: {}
      }
    });
    return successResponse(res, response.GetPriceBoardHKDResult);

  } catch (e) {
    return errorResponse(res, e.message);
  }
}

exports.getDealToSell = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID,
      },
      CustID: req.account.CfInfo.CustID,
    }
    const response = await soapTrading('GetDealToSell', params);
    return successResponse(res, response.GetDealToSellResult);

  } catch (e) {
    return errorResponse(res, e.message);
  }
}

exports.getAutoInvests = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID,
      },
      CustId: req.account.CfInfo.CustID,
    };
    const response = await soapTrading('GetAutoInvests', params);
    return successResponse(res, response.GetAutoInvestsResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getBankAccount = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      pv_Custid: req.account.CfInfo.CustID
    };
    const response = await soapTrading('GetBankAccount', params);
    return successResponse(res, response.GetBankAccountResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getTransferMoney = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      pv_Custid: req.account.CfInfo.CustID
    };
    const response = await soapTrading('GetTransferMoney', params);
    return successResponse(res, response.GetTransferMoneyResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.postTransferMoney = async (req, res) => {
  try {
    req.body.header = {
      Sessionid: req.account.CfInfo.SessionID,
      Password: req.account.Password
    }
    req.body.pv_CustID = req.account.CfInfo.CustID;
    const payload = req.body;
    const response = await soapTrading('TransferMoney', payload);
    return successResponse(res, response.TransferMoneyResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.createAutoInvestRule = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      RuleRequest: {
        Custid: req.account.CfInfo.CustID,
        MinAmt: req.body.param.soTienToiThieu,
        MaxAmt: req.body.param.soTienToiDa,
        ExhaustBalance: req.body.param.suDungHetSoDu,
        MinRate: req.body.param.loiTucDauTuTu,
        MaxRate: req.body.param.loiTucDauTuDen,
        MinTerm: req.body.param.kiHanDauTuTu,
        MaxTerm: req.body.param.kiHanDauTuDen,
        CustType: req.body.param.loaiKhachHang,
        MaxPercent: req.body.param.hanMucToiDaTheoNguoiGoiVon,
        Sector: req.body.param.chonNganhNghe
      }
    };
    const response = await soapTrading('CreateAutoInvestRule', params);
    return successResponse(res, response.CreateAutoInvestRuleResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.updateAutoInvestRule = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      RuleRequest: req.body.param
    };
    const response = await soapTrading('UpdateAutoInvestRule', params);
    return successResponse(res, response.UpdateAutoInvestRuleResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

// Tỷ suất sinh lời
exports.getNar = async (req, res) => {
  try {
    const params = {
      header: { Sessionid: req.account.CfInfo.SessionID },
      CustId: req.account.CfInfo.CustID
    };
    const response = await soapTrading('GetNar', params);
    return successResponse(res, response.GetNarResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

// Lịch sử giao dịch
exports.getCI = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID
      },
      SearchCI: {
        CustID: req.account.CfInfo.CustID,
        SearchPagingInfo: {
          OffsetNumber: req.query.OffsetNumber,
          TotalItem: req.query.TotalItem,
          CurrentIndex: req.query.CurrentIndex
        },
        FromDate: req.query.FromDate,
        ToDate: req.query.ToDate,
      }
    };
    const response = await soapTrading('GetCI', params);
    return successResponse(res, response.GetCIResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getLN = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID
      },
      SearchLN: {
        CustID: req.account.CfInfo.CustID,
        SearchPagingInfo: {
          OffsetNumber: '',
          TotalItem: '',
          CurrentIndex: ''
        },
        FromDate: req.query.FromDate,
        ToDate: req.query.ToDate,
        Status: req.query.Status
      }
    };
    const response = await soapTrading('GetLN', params);
    return successResponse(res, response.GetLNResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

// Lịch sử giao dịch
exports.getOrderBook = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID
      },
      SearchOrders: {
        CustID: req.account.CfInfo.CustID,
        SearchPagingInfo: {
          OffsetNumber: req.query.OffsetNumber,
          TotalItem: req.query.TotalItem,
          CurrentIndex: req.query.CurrentIndex
        },
        FromDate: req.query.FromDate,
        ToDate: req.query.ToDate,
      }
    };
    const response = await soapTrading('GetOrderBook', params);
    return successResponse(res, response.GetOrderBookResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getAllIncomeReport = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID
      },
      Custid: req.account.CfInfo.CustID,
    };
    const response = await soapTrading('GetAllIncomeReport', params);
    return successResponse(res, response.GetAllIncomeReportResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getIncomeByTime = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID
      },
      Custid: req.account.CfInfo.CustID,
      fromDate: req.query.FromDate,
      toDate: req.query.ToDate,
    };
    const response = await soapTrading('GetIncomeByTime', params);
    return successResponse(res, response.GetIncomeByTimeResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getSectors = async (req, res) => {
  try {
    const response = await soapTrading('GetSectors');
    return successResponse(res, response.GetSectorsResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.getChartInfo = async (req, res) => {
  try {
    const params = {
      header: {
        Sessionid: req.account.CfInfo.SessionID
      },
      Custid: req.account.CfInfo.CustID,
    };
    const response = await soapTrading('GetChartInfo', params);
    return successResponse(res, response.GetChartInfoResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.ireg = async (req, res) => {
  try {
    const payload = {
      header: {
        Sessionid: req.account.CfInfo.SessionID,
        Password: req.account.Password
      },
      IRegObj: {
        Custid: req.account.CfInfo.CustID,
        RegID: req.body.ReqID,
        Amt: req.body.Amt
      }
    };
    const response = await soapTrading('IReg', payload);
    return successResponse(res, response.IRegResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};

exports.iRegToSell = async (req, res) => {
  try {
    const payload = {
      header: {
        Sessionid: req.account.CfInfo.SessionID,
        Password: req.account.Password
      },
      pv_DealID: req.body.DealID,
      pv_Amt: req.body.Amt
    };

    const response = await soapTrading('IRegToSell', payload);
    return successResponse(res, response.IRegToSellResult);
  } catch (e) {
    return errorResponse(res, e.message);
  }
};