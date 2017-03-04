import request from 'request'
import { POLONIEX_BASE_PATH } from './constants'

const getPoloniexExchangeRate = (exchangeCurrencies) => {
  const url = `${POLONIEX_BASE_PATH}&currencyPair=${exchangeCurrencies}`
  request(url, (error, response, body) => {
    getAveragePoloniexExchangeRate(JSON.parse(body))
  })
}

const getAveragePoloniexExchangeRate = (exchangeData) => {
  const numberOfRecords = exchangeData.length
  const aggregateNumerator = exchangeData.reduce( (accumulator, currentRecord) => {
    accumulator += currentRecord.rate
  }, 0)
  return (aggregateNumerator/numberOfRecords)
}

export { getPoloniexExchangeRate }
