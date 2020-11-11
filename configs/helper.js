export const numberWithCommas = (x) => {
    const p = x.toString().split(".");
    const result = p[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return p[1] ? `${result}.${p[1]}` : result;

}
