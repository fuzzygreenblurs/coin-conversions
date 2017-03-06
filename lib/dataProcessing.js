import { POLONIEX_RATE_ATTRIBUTE, BITTREX_RATE_ATTRIBUTE } from './constants'
import { POLONIEX_TIMESTAMP_ATTRIBUTE, BITTREX_TIMESTAMP_ATTRIBUTE } from './constants'

export const processData = (api, currency, rawJson) => {
  const rawExchangeData = parseJsonForRawDataset(api, rawJson)
  let processedData = {}
  const standardizedDataset = standardizeDataset(rawExchangeData)

  processedData["currency"] = currency
  processedData["averageExchangeRate"] = getAverageExchangeRate(standardizedDataset)
  processedData["highestExchangeRate"] = getHighestExchangeRate(standardizedDataset)
  processedData["lowestExchangeRate"]  = getLowestExchangeRate(standardizedDataset)
  processedData["latestExchangeRate"]  = getLatestExchangeRate(standardizedDataset)

  return processedData
}

export const standardizeDataset = (rawExchangeData) => {
  const standardizedDataset = rawExchangeData.map((dataObject) => {
    let standardizedObject = {}

    standardizedObject["exchangeRate"] =
      Math.pow(dataObject[POLONIEX_RATE_ATTRIBUTE], -1) ||
      Math.pow(dataObject[BITTREX_RATE_ATTRIBUTE], -1)

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

  const averageExchangeRate = (aggregateNumerator/numberOfRecords)

  return (round(averageExchangeRate, 3))
}

export const getHighestExchangeRate = (exchangeData) => {
  const listOfExchangeRates = exchangeData.map(dataObject => dataObject.exchangeRate)
  const highestExchangeRate = Math.max(...listOfExchangeRates)

  return (round(highestExchangeRate, 3))
}

export const getLowestExchangeRate = (exchangeData) => {
  const listOfExchangeRates = exchangeData.map(dataObject => dataObject.exchangeRate)
  const lowestExchangeRate = Math.min(...listOfExchangeRates)

  return (round(lowestExchangeRate, 3))
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

const parseJsonForRawDataset = (api, rawJson) => {
  return api === 'Poloniex' ? rawJson : rawJson["result"]
}

const round = (value, decimals) => {
  const multiplier = 10 ** decimals
  return (Math.round(value * mutliplier) / multiplier)
}
