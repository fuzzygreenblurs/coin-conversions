import request from 'request'
import { POLONIEX_BASE_PATH, BITTREX_BASE_PATH } from './constants'

export const getPoloniexExchangeRate = (exchangeCurrencies) => {
  const url = `${POLONIEX_BASE_PATH}&currencyPair=${exchangeCurrencies}`
  return new Promise((resolve, reject) => {
    request(url, (error, response, body) => {
      resolve(JSON.parse(body))
    })
  })
}

export const getBittrexExchangeRate = () => {
  const url = BITTREX_BASE_PATH
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

//output high, low, last, average for both exchanges
