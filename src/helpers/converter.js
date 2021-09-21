export const converterTemp = (measurement, val) => {
    let res = val;
    switch (measurement) {
        case 'celsius':
            res = val-273.15
            break;
        case 'fahrenheit':
            res = ((val - 273.15) * 1.8) + 32
            break;
        default:
            break;
    }
    return res;
}