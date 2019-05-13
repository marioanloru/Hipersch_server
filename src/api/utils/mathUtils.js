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
    } else {
      let percentileBelow = module.exports.percentilRank(samples, valueBelow);
      let percentileAbove = module.exports.percentilRank(samples, valueAbove);
      console.log(valueBelow);
      console.log(value);
      console.log(valueAbove);
      let valueInterpolated = module.exports.linearInterpolation(valueBelow, value, valueAbove, 0, 100) / 100;
      res = percentileBelow + valueInterpolated *(percentileAbove - percentileBelow);
    }
      return Math.round(res * 100)/100;
  },
  linearInterpolation: (x0, x, x1, y0, y1) => {
    return Math.round(y0 + (y1 - y0) * ((x - x0) / (x1 - x0))* 100)/100;
  }
};