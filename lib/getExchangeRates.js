import request from 'request'
import { POLONIEX_BASE_PATH, BITTREX_BASE_PATH } from './constants'

export const getAllExchangeRatesFromSingleApi = (api, listOfCurrencies) => {
  let dataFromApi = {}

  const formattedCurrencies = Array.isArray(listOfCurrencies) ?
    listOfCurrencies : [listOfCurrencies]

  let populateDataObjectPromises = formattedCurrencies.map((currency) => {
    return getExchangeRateData(api, currency)
    .then((data) => {
      dataFromApi[currency] = data
    })
  })

  return Promise.all(populateDataObjectPromises)
  .then(() => {
    return dataFromApi
  })
}

const getExchangeRateData = (exchangeApi, fromCurrency) => {
  const url = urlGenerator(exchangeApi, fromCurrency)

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(JSON.parse(body))
    })
  })
}

const urlGenerator = (exchangeApi, fromCurrency) => {
  let output, market
  switch (exchangeApi.toLowerCase())
    {
      case 'poloniex':
        market = `BTC_${fromCurrency.toUpperCase()}`
        output = `${POLONIEX_BASE_PATH}?command=returnTradeHistory&currencyPair=${market}`
        break

      case 'bittrex':
        market = `BTC-${fromCurrency.toUpperCase()}`
        output = `${BITTREX_BASE_PATH}/getmarkethistory?market=${market}`
        break
    }

    return output
}
