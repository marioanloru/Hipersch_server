module.exports = {
  percentilRank: (samples, value) => {
    let valueInSample = false;
    let valuePassed = false;
    let timesUnder = 0;
    let timesAbove = 0;
    let valueAbove = 0;
    let valueBelow = 0;
    let res = 0.0; 

    //  Look for value bounds
    console.log("Samples value: ", samples, value)
    for (let i = 0; i < samples.length; i += 1) {
      if (samples[i] === value && !valueInSample) {
        valueInSample = true;
      } else {
        if (samples[i] < value) {
          timesUnder += 1;
        } else if (samples[i] > value) {
          if (!valuePassed ) {
            valuePassed = true;
            valueAbove = samples[i];
            if (valueInSample) {
              valueBelow = samples[i - 2];
            } else {
              valueBelow = samples[i - 1];
            }
          }
          timesAbove += 1;
        }
      }
    }

    if (valueInSample) {
      res = timesUnder / (timesUnder + timesAbove);
      console.log("Value in sample: ", res);
    } else {
      let percentileBelow = module.exports.percentilRank(samples, valueBelow);
      console.log("Percentil por debajo: ", percentileBelow);      
      let percentileAbove = module.exports.percentilRank(samples, valueAbove);
      console.log("Percentil por debajo: ", percentileAbove);
      let valueInterpolated = module.exports.linearInterpolation(valueBelow, value, valueAbove, 0, 100) / 100;
      console.log("Valor interpolado: ", valueInterpolated);
      res = percentileBelow + valueInterpolated *(percentileAbove - percentileBelow);
      console.log("Resultado:: ", res);
    }
    return Math.round(res * 100)/100;
  },
  linearInterpolation: (x0, x, x1, y0, y1) => {
    return Math.round(y0 + (y1 - y0) * ((x - x0) / (x1 - x0))* 100)/100;
  }
};