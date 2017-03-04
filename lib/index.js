import { getExchangeRate } from './getExchangeRates'

// getExchangeRate('Bittrex', 'BTC-LTC').then((exchangeData) => {
//   console.log(exchangeData)
// })
getExchangeRate('Poloniex', 'BTC_LTC').then((exchangeData) => {
  console.log(exchangeData)
})
