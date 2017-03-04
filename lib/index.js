import { getPoloniexExchangeRate, getAveragePoloniexExchangeRate, getBittrexExchangeRate } from './getExchangeRates'


// getPoloniexExchangeRate('BTC_LTC')
// .then((exchangeData) => {
//   console.log(getAveragePoloniexExchangeRate(exchangeData))
// })

getBittrexExchangeRate().then((exchangeData) => {
  console.log(exchangeData.result, exchangeData.result.length);
})
