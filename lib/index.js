import { getExchangeRateData } from './getExchangeRates'

// getExchangeRate('Bittrex', 'BTC-LTC').then((exchangeData) => {
//   console.log(exchangeData)
// })
getExchangeRateData('Poloniex', 'LTC').then((exchangeData) => {
  console.log(exchangeData)
})
