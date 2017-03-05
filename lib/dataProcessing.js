//output high, low, last, average for both exchanges
import { POLONIEX_RATE_ATTRIBUTE, BITTREX_RATE_ATTRIBUTE } from './constants'
import { POLONIEX_TIMESTAMP_ATTRIBUTE, BITTREX_TIMESTAMP_ATTRIBUTE } from './constants'

export const standardizeDataset = (rawExchangeData) => {
  const standardizedDataset = rawExchangeData.map((dataObject) => {
    let standardizedObject = {}

    standardizedObject["exchangeRate"] =
    dataObject[POLONIEX_RATE_ATTRIBUTE] || dataObject[BITTREX_RATE_ATTRIBUTE]

    const rawTimestamp = 
      dataObject[POLONIEX_TIMESTAMP_ATTRIBUTE] || dataObject[BITTREX_TIMESTAMP_ATTRIBUTE]
    standardizedObject["timeStamp"] = convertTimeStamp(rawTimestamp)

    return standardizedObject
  })

  return standardizedDataset
}

const convertTimeStamp = (timestamp) => {
  return new Date(timestamp)
}

export const getAverageExchangeRate = (exchangeData) => {
  const numberOfRecords = exchangeData.length
  const aggregateNumerator = exchangeData.reduce((accumulator, currentRecord) => {
    accumulator += parseFloat(currentRecord.exchangeRate)
    return accumulator
  }, 0)

  return (aggregateNumerator/numberOfRecords)
}

export const getHighestExchangeRate = (exchangeData) => {
  const listOfExchangeRates = exchangeData.map(dataObject => dataObject.exchangeRate)
  return Math.max(...listOfExchangeRates)
}

export const getLowestExchangeRate = (exchangeData) => {
  const listOfExchangeRates = exchangeData.map(dataObject => dataObject.exchangeRate)
  return Math.min(...listOfExchangeRates)
}

export const getLatestExchangeRate = (exchangeData) => {
  const listOfTimeStamps = exchangeData.map(dataObject => dataObject.timeStamp)
  return Math.max(...listOfTimeStamps)
}
