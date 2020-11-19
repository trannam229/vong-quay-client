export const numberWithCommas = (x) => {
    x = Math.round(x);
    const p = x.toString().split(".");
    const result = p[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p[1] ? `${result}.${p[1]}` : result;
}

export const getSectorName = (id, sectorList) => {
  return sectorList.find(sector => sector.Val === id);
}