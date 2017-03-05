import { getAllExchangeRatesFromSingleApi, getAllExchangeRateData, getExchangeRateData } from './getExchangeRates'

const LIST_OF_APIS = ['Poloniex', 'Bittrex']
const LIST_OF_CURRENCIES = ['LTC', 'DASH']

getAllExchangeRatesFromSingleApi('Poloniex', LIST_OF_CURRENCIES)
.then((values) => {
  console.log(values, 'VALUES')
})
