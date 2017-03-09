import { POLONIEX_RATE_ATTRIBUTE, BITTREX_RATE_ATTRIBUTE } from './constants'
import { POLONIEX_TIMESTAMP_ATTRIBUTE, BITTREX_TIMESTAMP_ATTRIBUTE } from './constants'

export const getAllBestExchangeRates = (finalProcessedData, listOfCurrencies) => {
  let bestExchangeRates = { optimalExchangeRates: [] }
  const groupedDataForCurrency = listOfCurrencies.map((currency) => {
    let dataGroup = []
    finalProcessedData.forEach((apiDataObject) => {
      const apiData = apiDataObject["data"]
      apiData.forEach((dataInstance) => {
        if(dataInstance["currency"] === currency) {
          dataGroup.push(dataInstance)
        }
      })
    })
    const optimalExchangeInstance = getBestExchangeRate(dataGroup)
    bestExchangeRates["optimalExchangeRates"].push(optimalExchangeInstance)
  })

  return bestExchangeRates
}

export const generateFinalDataFromApi = (api, rawData) => {
  let finalOutput = {}

  const output = formatDataForFinalOutput(api, rawData)
  finalOutput["dataSource"] = api
  finalOutput["data"] = output

  return finalOutput
}

const getBestExchangeRate = (groupedInstances) => {
  let sortedInstances = groupedInstances.sort((a, b) => {
    return b.averageExchangeRate - a.averageExchangeRate
  })

  return sortedInstances[0]
}

const processData = (api, currency, rawJson) => {
  const rawExchangeData = parseJsonForRawDataset(api, rawJson)
  const standardizedDataset = standardizeDataset(rawExchangeData)
  let processedData = {}

  processedData["dataSource"] = api
  processedData["currency"] = currency
  processedData["averageExchangeRate"] = getAverageExchangeRate(standardizedDataset)
  processedData["highestExchangeRate"] = getHighestExchangeRate(standardizedDataset)
  processedData["lowestExchangeRate"]  = getLowestExchangeRate(standardizedDataset)
  processedData["latestExchangeRate"]  = getLatestExchangeRate(standardizedDataset)

  return processedData
}

const standardizeDataset = (rawExchangeData) => {
  const standardizedDataset = rawExchangeData.map((dataObject) => {
    let standardizedObject = {}

    standardizedObject["exchangeRate"] =
      round(Math.pow(dataObject[POLONIEX_RATE_ATTRIBUTE], -1), 2) ||
      round(Math.pow(dataObject[BITTREX_RATE_ATTRIBUTE],  -1), 2)

    const rawTimestamp =
      dataObject[POLONIEX_TIMESTAMP_ATTRIBUTE] || dataObject[BITTREX_TIMESTAMP_ATTRIBUTE]
    standardizedObject["timeStamp"] = convertTimeStamp(rawTimestamp)

    return standardizedObject
  })

  return standardizedDataset
}

const getAverageExchangeRate = (exchangeData) => {
  const numberOfRecords = exchangeData.length
  const aggregateNumerator = exchangeData.reduce((accumulator, currentRecord) => {
    accumulator += parseFloat(currentRecord.exchangeRate)
    return accumulator
  }, 0)

  const averageExchangeRate = (aggregateNumerator/numberOfRecords)

  return (round(averageExchangeRate, 2))
}

const getHighestExchangeRate = (exchangeData) => {
  const listOfExchangeRates = exchangeData.map(dataObject => dataObject.exchangeRate)
  const highestExchangeRate = Math.max(...listOfExchangeRates)

  return (round(highestExchangeRate, 2))
}

const getLowestExchangeRate = (exchangeData) => {
  const listOfExchangeRates = exchangeData.map(dataObject => dataObject.exchangeRate)
  const lowestExchangeRate = Math.min(...listOfExchangeRates)

  return (round(lowestExchangeRate, 2))
}

const getLatestExchangeRate = (exchangeData) => {
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
  return api.toLowerCase() === 'poloniex' ? rawJson : rawJson["result"]
}

const round = (value, decimals) => {
  const multiplier = 10 ** decimals
  return (Math.round(value * multiplier) / multiplier)
}

const formatDataForFinalOutput = (api, rawData) => {
  let output = Object.keys(rawData).map((currency) => {
    return processData(api, currency, rawData[currency])
  })

  return output
}
