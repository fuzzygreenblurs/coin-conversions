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
  let sortedExchangeData = exchangeData.sort((a, b) => {
    const dA = new Date(a.timeStamp)
    const dB = new Date(b.timeStamp)
    return b - a
  })

  return sortedExchangeData[0]
}

const convertTimeStamp = (timestamp) => {
  return new Date(timestamp)
}

export const processData = (rawExchangeData) => {
  let processedData = {}
  const standardizedDataset = standardizeDataset(rawExchangeData)

  processedData["averageExchangeRate"] = getAverageExchangeRate(standardizedDataset)
  processedData["highestExchangeRate"] = getHighestExchangeRate(standardizedDataset)
  processedData["lowestExchangeRate"]  = getLowestExchangeRate(standardizedDataset)
  processedData["latestExchangeRate"]  = getLatestExchangeRate(standardizedDataset)

  return processedData
}
