export const formatCurrency = (amount) => {
    let a = Number(amount);
    if(isNaN(a)){
        a = 0;
    }
    return new Intl.NumberFormat("en-CO", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(a).replace(/,/g, '.');;
}