import request from 'request'
import { POLONIEX_BASE_PATH, BITTREX_BASE_PATH } from './constants'

export const getAllExchangeRatesFromSingleApi = (api, listOfCurrencies) => {
  let dataFromApi = {}
  let populateDataObjectPromises = listOfCurrencies.map((currency) => {
    return getExchangeRateData(api, currency).then((data) => {
      dataFromApi[currency] = data
    })
  })

  return Promise.all(populateDataObjectPromises).then(() => {
    return dataFromApi
  })
}

export const getExchangeRateData = (exchangeApi, fromCurrency) => {
  const url = urlGenerator(exchangeApi, fromCurrency)

  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(JSON.parse(body))
    })
  })
}

export const getAveragePoloniexExchangeRate = (exchangeData) => {
  const numberOfRecords = exchangeData.length
  const aggregateNumerator = exchangeData.reduce( (accumulator, currentRecord) => {
    accumulator += parseFloat(currentRecord.rate)
    return accumulator
  }, 0)

  return (aggregateNumerator/numberOfRecords)
}

const urlGenerator = (exchangeApi, fromCurrency) => {
  let output, market
  switch (exchangeApi)
    {
      case 'Poloniex':
        market = `BTC_${fromCurrency}`
        output = `${POLONIEX_BASE_PATH}?command=returnTradeHistory&currencyPair=${market}`
        break

      case 'Bittrex':
        market = `BTC-${fromCurrency}`
        output = `${BITTREX_BASE_PATH}/getmarkethistory?market=${market}`
        break
    }

    return output
}

//output high, low, last, average for both exchanges
