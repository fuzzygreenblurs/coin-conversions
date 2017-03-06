import {
  getAllExchangeRatesFromSingleApi,
  getAllExchangeRateData,
  getExchangeRateData }
from './getExchangeRates'

import {
  generateFinalDataFromApi,
  standardizeDataset,
  getAverageExchangeRate,
  getHighestExchangeRate,
  getLowestExchangeRate,
  processData }
from './dataProcessing'

const LIST_OF_APIS = ['Poloniex', 'Bittrex']
const LIST_OF_CURRENCIES = ['ETH', 'LTC', 'DASH']
const POLONIEX_DATASET = [
  {
    "globalTradeID": 84735961,
    "tradeID": 2606806,
    "date": "2017-03-05 21:05:20",
    "type": "sell",
    "rate": "0.00311372",
    "amount": "5.14033236",
    "total": "0.01600555"
  },
  {
    "globalTradeID": 84735923,
    "tradeID": 2606805,
    "date": "2017-03-05 21:05:07",
    "type": "buy",
    "rate": "0.00311373",
    "amount": "5.74106779",
    "total": "0.01787607"
  }
]

const BITTREX_DATASET = [
  {
    "Id": 34421624,
    "TimeStamp": "2017-03-05T20:55:34.8",
    "Quantity": 2,
    "Price": 0.00313213,
    "Total": 0.00626426,
    "FillType": "FILL",
    "OrderType": "BUY"
  },
  {
    "Id": 34419459,
    "TimeStamp": "2017-03-05T20:28:15.323",
    "Quantity": 120.35690871,
    "Price": 0.00307628,
    "Total": 0.37025155,
    "FillType": "PARTIAL_FILL",
    "OrderType": "SELL"
  }
]

const main = (listOfApis, listOfCurrencies) => {
  let processedDataFromAllApis = []
  listOfApis.forEach((api) => {
    getAllExchangeRatesFromSingleApi(api, listOfCurrencies).then((rawData) => {
      return generateFinalDataFromApi(api, rawData)
    }).then((processedDataFromSingleApi) => {
      processedDataFromAllApis.push(processedDataFromSingleApi)
      return processedDataFromAllApis
    })
  })
}

main(LIST_OF_APIS, LIST_OF_CURRENCIES)
