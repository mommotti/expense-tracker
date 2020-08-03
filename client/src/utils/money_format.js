export function numberWithCommas(m) {
    return m.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}